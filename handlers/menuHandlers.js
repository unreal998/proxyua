import { adminMenu, createBackMenu, userMenu } from "../UI/menus.js";
import { settingsMenu } from "../UI/settings.js";
import { menuDictionary, proxyListMenu } from '../UI/dictionary.js';
import {addNewProxyConfig, getProxyList } from "../database/api.js";
import { generateProxyListMenu } from "../UI/proxyList.js";

export default function menuHandlers(cbData, bot, message, userData, responceMessageAwaiting) {
  responceMessageAwaiting.type = 'menu';
  responceMessageAwaiting.lastRequestMessage = cbData.button;
    if (cbData.button === "Налаштування") {
        if (userData.type === 'admin') {
          bot.sendMessage(message.chat.id, settingsMenu.text, settingsMenu);
        } else {
          bot.sgetProxyListendMessage(
            message.chat.id,
            createBackMenu("Налаштування").text,
            createBackMenu("Налаштування")
          );
        }
      } else if (cbData.button === "Назад") {
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
              text: `Edit`,
              callback_data: JSON.stringify({
                type: 'proxyMenu',
                id: key,
                button: proxyListMenu.EDIT,
              })
            }
            const removeButton = {
              text: `Remove`,
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
          createBackMenu("Відкриті заявки").text,
          createBackMenu("Відкриті заявки")
        );
      } else if (cbData.button === menuDictionary.ADD_PROXY) {
        bot.sendMessage(
          message.chat.id,
          'Введіть адресу проксі',
          createBackMenu(menuDictionary.ADD_PROXY)
        );
      } else if (cbData.button === "Арендувати проксі") {
        bot.sendMessage(
          message.chat.id,
          createBackMenu("Арендувати проксі").text,
          createBackMenu("Арендувати проксі")
        );
      } else if (cbData.button === "Поповнити гаманець") {
        bot.sendMessage(
          message.chat.id,
          createBackMenu("Поповнити гаманець").text,
          createBackMenu("Поповнити гаманець")
        );
      } else if (cbData.button === "Мої проксі") {
        bot.sendMessage(
          message.chat.id,
          createBackMenu("Мої проксі").text,
          createBackMenu("Мої проксі")
        );
      } else if (cbData.button === "Мої транзакції") {
        bot.sendMessage(
          message.chat.id,
          createBackMenu("Мої транзакції").text,
          createBackMenu("Мої транзакції")
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