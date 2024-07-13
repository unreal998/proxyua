import { adminMenu, createBackToMenuMenu, userMenu } from "../UI/menus.js";
import { adminSettingsMenu } from "../UI/settings.js";
import {
  menuDictionary,
  proxyListMenu,
  transactionListMenu,
  userMenuDictionary,
  rentMenuDictionary,
} from "../UI/dictionary.js";
import {
  addNewProxyConfig,
  getProxyList,
  getTransactionList,
  getActiveTransactionList,
  getTransactionData,
} from "../database/api.js";
import { generateProxyListMenu } from "../UI/proxyList.js";
import { generateTransactionListMenu } from "../UI/transactionList.js";

export default function menuHandlers(
  cbData,
  bot,
  message,
  userData,
  responceMessageAwaiting
) {
  responceMessageAwaiting.type = "menu";
  responceMessageAwaiting.lastRequestMessage = cbData.btn;
  if (cbData.btn === menuDictionary.MAIN_MENU) {
    if (userData.type === "admin") {
      bot.sendMessage(message.chat.id, menuDictionary.MAIN_MENU, adminMenu);
    } else {
      bot.sendMessage(message.chat.id, menuDictionary.MAIN_MENU, userMenu);
    }
  } else if (cbData.btn === menuDictionary.PROXY_LIST) {
    getProxyList().then((data) => {
      const list = [];
      for (const key in data) {
        const element = data[key];
        const listObject = {
          text: `${element.address} - ${element.status ? "🟢" : "🔴"}`,
          callback_data: JSON.stringify({
            type: "proxyMenu",
            id: key,
            btn: proxyListMenu.INFO,
          }),
        };
        const editButton = {
          text: proxyListMenu.EDIT,
          callback_data: JSON.stringify({
            type: "proxyMenu",
            id: key,
            btn: proxyListMenu.EDIT,
          }),
        };
        const removeButton = {
          text: proxyListMenu.REMOVE,
          callback_data: JSON.stringify({
            type: "proxyMenu",
            id: key,
            btn: proxyListMenu.REMOVE,
          }),
        };
        list.push([listObject]);
        list.push([editButton, removeButton]);
      }
      bot.sendMessage(
        message.chat.id,
        "Список проксі",
        generateProxyListMenu(list)
      );
    });
  } else if (cbData.btn === menuDictionary.PENDING_TRANSACTIONS) {
    getActiveTransactionList().then((data) => {
      const list = [];
      data.forEach((element) => {
        const listObject = {
          text: `${element.proxyAddress}`,
          callback_data: JSON.stringify({
            type: "tMenu",
            id: element.id,
            btn: transactionListMenu.INFO,
          }),
        };
        list.push([listObject]);
      });
      bot.sendMessage(
        message.chat.id,
        menuDictionary.PENDING_TRANSACTIONS,
        generateTransactionListMenu(list)
      );
    });
  } else if (cbData.btn === menuDictionary.ADD_PROXY) {
    bot.sendMessage(
      message.chat.id,
      "Введіть адресу проксі",
      createBackToMenuMenu()
    );
  } else if (cbData.btn === userMenuDictionary.RENT) {
    getProxyList().then((data) => {
      const availableProxies = [];
      for (const key in data) {
        if (data[key].status) {
          availableProxies.push({
            text: `🖥️  ${data[key].address}`,
            callback_data: JSON.stringify({
              type: "rent",
              ad: data[key].address,
              btn: rentMenuDictionary.RENT_ADDRESS,
            }),
          });
        }
      }
      const proxyButtons = availableProxies.map((proxy) => [proxy]);
      bot.sendMessage(message.chat.id, userMenuDictionary.FREE, {
        reply_markup: {
          inline_keyboard: [
            ...proxyButtons,
            [
              {
                text: `🔙 ${menuDictionary.MAIN_MENU}`,
                callback_data: JSON.stringify({
                  type: "menu",
                  btn: menuDictionary.MAIN_MENU,
                }),
              },
            ],
          ],
        },
      });
    });
  } else if (cbData.btn === "Мої проксі") {
    bot.sendMessage(message.chat.id, "Мої проксі", createBackToMenuMenu());
  } else if (cbData.btn === menuDictionary.SETTINGS) {
    if (userData.type === "admin") {
      bot.sendMessage(
        message.chat.id,
        menuDictionary.SETTINGS,
        adminSettingsMenu
      );
    } else {
      bot.sendMessage(message.chat.id, menuDictionary.MAIN_MENU, userMenu);
    }
  } else if (cbData.btn === "Історія") {
    getTransactionList().then((data) => {
      const list = [];
      for (const key in data) {
        const element = data[key];
        const listObject = {
          text: `${element.proxyAddress} - ${element.rentTime}`,
          callback_data: JSON.stringify({
            type: "transactionInfo",
            id: key,
            btn: "transactionInfo",
          }),
        };
        list.push([listObject]);
      }

      bot.sendMessage(message.chat.id, "Історія ваших орендованих проксі", {
        reply_markup: {
          inline_keyboard: [
            ...list,
            [
              {
                text: `🔙 ${menuDictionary.MAIN_MENU}`,
                callback_data: JSON.stringify({
                  type: "menu",
                  btn: menuDictionary.MAIN_MENU,
                }),
              },
            ],
          ],
        },
      });
    });
  } else if (cbData.type === "transactionInfo") {
    getTransactionData(cbData.id).then((transaction) => {
      bot.sendMessage(
        message.chat.id,
        `Проксі: ${transaction.proxyAddress}\nСтатус: ${transaction.status}\nВартість: ${transaction.price}\nЧас оренди: ${transaction.rentTime}\nСилка на фото оплати: ${transaction.photoURI}`,
        createBackToMenuMenu()
      );
    });
  } else {
    bot.sendMessage(message.chat.id, `Ви нажали menu кнопку: ${cbData.btn}`);
  }
}

export function menuResponceHandlers(responceMessageAwaiting, bot, message) {
  switch (responceMessageAwaiting.lastRequestMessage) {
    case menuDictionary.ADD_PROXY:
      addNewProxyConfig(message).then((data) => {
        bot.sendMessage(
          message.chat.id,
          "Дані проксі додано",
          createBackToMenuMenu()
        );
      });
      break;
    default:
      bot.sendMessage(message.chat.id, "unknown text menu responce");
  }
}
