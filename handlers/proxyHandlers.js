import { proxyListMenu, menuDictionary } from "../UI/dictionary.js";
import { createBackToMenuMenu } from "../UI/menus.js";
import { generateEditProxyMenu, generateProxyRemoveConfirmation } from "../UI/proxyList.js";
import { getProxyData, updateProxyData, deleteProxy } from "../database/api.js";

export default function proxyMenuHandlers(
  cbData,
  bot,
  message,
  userData,
  responceMessageAwaiting
) {
  if (userData.type === "admin") {
    responceMessageAwaiting.type = cbData.type;
    responceMessageAwaiting.lastRequestMessage = cbData.btn;
    responceMessageAwaiting.id = cbData.id;
    switch (cbData.btn) {
      case proxyListMenu.EDIT:
        bot.sendMessage(
          message.chat.id,
          `Що ви бажаєте редагувати?`,
          generateEditProxyMenu(cbData.id)
        );
        break;
      case proxyListMenu.REMOVE:
        const buttonList = [];
        const yestBtn = {
          text: proxyListMenu.YES,
          callback_data: JSON.stringify({
            btn: proxyListMenu.YES,
            type: cbData.type,
            proxyId: cbData.id,
          }),
        };
        const noButton = {
          text: proxyListMenu.NO,
          callback_data: JSON.stringify({
            type: "menu",
            btn: menuDictionary.MAIN_MENU,
          }),
        };
        buttonList.push([yestBtn, noButton]);
        bot.sendMessage(
          message.chat.id,
          `Ви впевнені що хочете видалити проксі?`,
          generateProxyRemoveConfirmation(buttonList)
        );
        break;
      case proxyListMenu.INFO:
        getProxyData(cbData.id).then((data) => {
          bot.sendMessage(
            message.chat.id,
            `
                        Адреса: ${data.address} \n
Логін: ${data.login} \n
Пароль: ${data.password} \n
Статус: ${data.status ? " 🟢" : " 🔴"}\n
${data.status ? '' : `Арендовано: ${data.rentedBy} \n
Кінець аренди ${new Date(data.rentEnd).toLocaleString()}`}`, createBackToMenuMenu());
                })
                break;
      case proxyListMenu.EDIT_LOGIN:
        bot.sendMessage(message.chat.id, `Введіть новий логін`);
        break;
      case proxyListMenu.EDIT_PASSWORD:
        bot.sendMessage(message.chat.id, `Введіть новий пароль`);
        break;
      case proxyListMenu.EDIT_ADDRESS:
        bot.sendMessage(message.chat.id, `Введіть нову адресу`);
        break;
      case proxyListMenu.YES:
        deleteProxy(cbData.proxyId).then((data) => {
          bot.sendMessage(message.chat.id, data);
        })        
        break;
      default:
        bot.sendMessage(message.chat.id, `Ви нажали proxy кнопку: ${cbData.btn}`);
    }
  } else {
      bot.sendMessage(message.chat.id, `У вас немає доступу для перегляду`);
  }
}

export function proxyMenuResponceHandlers(
  responceMessageAwaiting,
  bot,
  message
) {
  switch (responceMessageAwaiting.lastRequestMessage) {
    case proxyListMenu.EDIT_LOGIN:
      getProxyData(responceMessageAwaiting.id).then((data) => {
        const updateLoginData = {
          ...data,
          login: message.text,
        };
        updateProxyData(updateLoginData, responceMessageAwaiting.id).then(
          (updData) => {
            bot.sendMessage(
              message.chat.id,
              `Логін змінено на: ${updData.login}`,
              createBackToMenuMenu()
            );
          }
        );
      });
      break;
    case proxyListMenu.EDIT_PASSWORD:
      getProxyData(cbData.id).then((data) => {
        const updateLoginData = {
          ...data,
          password: message.text,
        };
        updateProxyData(updateLoginData).then((updData) => {
          bot.sendMessage(
            message.chat.id,
            `Пароль змінено на: ${updData.password}`,
            createBackToMenuMenu()
          );
        });
      });
      break;
    case proxyListMenu.EDIT_ADDRESS:
      getProxyData(cbData.id).then((data) => {
        const updateLoginData = {
          ...data,
          address: message.text,
        };
        updateProxyData(updateLoginData).then((updData) => {
          bot.sendMessage(
            message.chat.id,
            `Адресу змінено на: ${updData.address}`,
            createBackToMenuMenu()
          );
        });
      });
      break;
    default:
      bot.sendMessage(message.chat.id, "unknown proxy text responce");
  }
}
