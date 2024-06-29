import { proxyListMenu } from "../UI/dictionary.js";
import { createBackToMenuMenu } from "../UI/menus.js";
import { generateEditProxyMenu } from "../UI/proxyList.js";
import { getProxyData, updateProxyData } from "../database/api.js";

export default function proxyMenuHandlers(
  cbData,
  bot,
  message,
  userData,
  responceMessageAwaiting
) {
  if (userData.type === "admin") {
    responceMessageAwaiting.type = cbData.type;
    responceMessageAwaiting.lastRequestMessage = cbData.button;
    responceMessageAwaiting.id = cbData.id;
    switch (cbData.button) {
      case proxyListMenu.EDIT:
        bot.sendMessage(
          message.chat.id,
          `Що ви бажаєте редагувати?`,
          generateEditProxyMenu(cbData.id)
        );
        break;
      case proxyListMenu.REMOVE:
        bot.sendMessage(
          message.chat.id,
          `Ви впевнені що хочете видалити дані проксі?`
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
${
  data.status
    ? ""
    : `Арендовано: ${data.rentedBy} \n
Кінець аренди ${new Date(data.rentEnd).toLocaleString()}`
}`,
            createBackToMenuMenu()
          );
        });
        break;
      case proxyListMenu.EDIT_LOGIN:
        bot.sendMessage(message.chat.id, `Введіть новий логін`);
        break;
      case proxyListMenu.EDIT_PASSWORD:
        bot.sendMessage(
          message.chat.id,
          `Ви впевнені що хочете видалити ${cbData.button}?`
        );
        break;
      case proxyListMenu.EDIT_ADDRESS:
        bot.sendMessage(
          message.chat.id,
          `Ви впевнені що хочете видалити ${cbData.button}?`
        );
        break;
      default:
        bot.sendMessage(message.chat.id, `Ви нажали кнопку: ${cbData.button}`);
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
            console.log("========", updData);
            bot.sendMessage(
              message.chat.id,
              `Логін змінено на: ${data.login}`,
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
        updateProxyData(updateLoginData).then((data) => {
          bot.sendMessage(
            message.chat.id,
            `Пароль змінено на: ${data.password}`,
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
        updateProxyData(updateLoginData).then((data) => {
          bot.sendMessage(
            message.chat.id,
            `Адресу змінено на: ${data.address}`,
            createBackToMenuMenu()
          );
        });
      });
      break;
    default:
      bot.sendMessage(message.chat.id, "unknown text responce");
  }
}
