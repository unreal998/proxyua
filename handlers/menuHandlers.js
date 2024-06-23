import { adminMenu, createBackToMenuMenu, userMenu } from "../UI/menus.js";
import { settingsMenu } from "../UI/settings.js";
import { menuDictionary, proxyListMenu } from '../UI/dictionary.js';
import {addNewProxyConfig, getProxyList } from "../database/api.js";
import { generateProxyListMenu } from "../UI/proxyList.js";

export default function menuHandlers(cbData, bot, message, userData, responceMessageAwaiting) {
  responceMessageAwaiting.type = 'menu';
  responceMessageAwaiting.lastRequestMessage = cbData.button;
    if (cbData.button === menuDictionary.SETTINGS) {
        if (userData.type === 'admin') {
          bot.sendMessage(message.chat.id, settingsMenu.text, settingsMenu);
        } else {
          bot.sendMessage(
            message.chat.id,
            settingsMenu.text,
            settingsMenu
          );
        }
      } else if (cbData.button === menuDictionary.MAIN_MENU) {
        if (userData.type === "admin") {
            bot.sendMessage(message.chat.id, menuDictionary.MAIN_MENU, adminMenu);
        } else {
            bot.sendMessage(message.chat.id, menuDictionary.MAIN_MENU, userMenu);
        }
      } else if (cbData.button === menuDictionary.PROXY_LIST) {
        getProxyList().then(data => {
          const list = [];
          for (const key in data) {
            const element = data[key];
            const listObject = {
              text: `${element.address} - ${element.status ? '🟢' : '🔴'}`,
              callback_data: JSON.stringify({
                type: 'proxyMenu',
                id: key,
                button: element.address,
              })
            }
            const editButton = {
              text: proxyListMenu.EDIT,
              callback_data: JSON.stringify({
                type: 'proxyMenu',
                id: key,
                button: proxyListMenu.EDIT,
              })
            }
            const removeButton = {
              text: proxyListMenu.REMOVE,
              callback_data: JSON.stringify({
                type: 'proxyMenu',
                id: key,
                button: proxyListMenu.REMOVE,
              })
            }
            list.push([listObject]);
            list.push([editButton, removeButton]);
          }
          bot.sendMessage(message.chat.id, 'Список проксі', generateProxyListMenu(list));
        })
      } else if (cbData.button === "Відкриті заявки") {
        bot.sendMessage(
          message.chat.id,
          "Відкриті заявки",
          createBackToMenuMenu()
        );
      } else if (cbData.button === menuDictionary.ADD_PROXY) {
        bot.sendMessage(
          message.chat.id,
          'Введіть адресу проксі',
          createBackToMenuMenu()
        );
      } else if (cbData.button === "Арендувати проксі") {
        bot.sendMessage(
          message.chat.id,
          "Арендувати проксі",
          createBackToMenuMenu()
        );
      } else if (cbData.button === "Поповнити гаманець") {
        bot.sendMessage(
          message.chat.id,
          "Поповнити гаманець",
          createBackToMenuMenu()
        );
      } else if (cbData.button === "Мої проксі") {
        bot.sendMessage(
          message.chat.id,
          "Мої проксі",
          createBackToMenuMenu()
        );
      } else if (cbData.button === "Мої транзакції") {
        bot.sendMessage(
          message.chat.id,
          "Мої транзакції",
          createBackToMenuMenu()
        );
      } else {
        bot.sendMessage(message.chat.id, `Ви нажали кнопку: ${cbData.button}`);
      }
}

export function menuResponceHandlers(responceMessageAwaiting, bot, message) {
  switch (responceMessageAwaiting.lastRequestMessage) {
    case menuDictionary.ADD_PROXY:
      addNewProxyConfig(message).then((data) => {
        bot.sendMessage(message.chat.id, 'Дані проксі додано');
      });
      break;
    default:
      bot.sendMessage(message.chat.id, 'unknown text responce');
  }

}