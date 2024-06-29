import { adminMenu, createBackToMenuMenu, userMenu } from "../UI/menus.js";
import { settingsMenu } from "../UI/settings.js";
import {
  menuDictionary,
  proxyListMenu,
  userMenuDictionary,
} from "../UI/dictionary.js";
import { addNewProxyConfig, getProxyList } from "../database/api.js";
import { generateProxyListMenu } from "../UI/proxyList.js";

export default function menuHandlers(
  cbData,
  bot,
  message,
  userData,
  responceMessageAwaiting
) {
  responceMessageAwaiting.type = "menu";
  responceMessageAwaiting.lastRequestMessage = cbData.button;

  if (cbData.button === menuDictionary.SETTINGS) {
    bot.sendMessage(message.chat.id, settingsMenu.text, settingsMenu);
  } else if (cbData.button === menuDictionary.MAIN_MENU) {
    if (userData.type === "admin") {
      bot.sendMessage(message.chat.id, menuDictionary.MAIN_MENU, adminMenu);
    } else {
      bot.sendMessage(message.chat.id, menuDictionary.MAIN_MENU, userMenu);
    }
  } else if (cbData.button === menuDictionary.PROXY_LIST) {
    getProxyList().then((data) => {
      const list = [];
      for (const key in data) {
        const element = data[key];
        const listObject = {
          text: `${element.address} - ${element.status ? "🟢" : "🔴"}`,
          callback_data: JSON.stringify({
            type: "proxyMenu",
            id: key,
            button: proxyListMenu.INFO,
          }),
        };
        const editButton = {
          text: proxyListMenu.EDIT,
          callback_data: JSON.stringify({
            type: "proxyMenu",
            id: key,
            button: proxyListMenu.EDIT,
          }),
        };
        const removeButton = {
          text: proxyListMenu.REMOVE,
          callback_data: JSON.stringify({
            type: "proxyMenu",
            id: key,
            button: proxyListMenu.REMOVE,
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
  } else if (cbData.button === "Відкриті заявки") {
    bot.sendMessage(message.chat.id, "Відкриті заявки", createBackToMenuMenu());
  } else if (cbData.button === menuDictionary.ADD_PROXY) {
    bot.sendMessage(
      message.chat.id,
      "Введіть адресу проксі",
      createBackToMenuMenu()
    );
  } else if (cbData.button === userMenuDictionary.RENT) {
    getProxyList().then((data) => {
      const availableProxies = [];
      for (const key in data) {
        if (data[key].status) {
          availableProxies.push({
            text: data[key].address,
            callback_data: JSON.stringify({
              type: "proxyRent",
              id: key,
              button: data[key].address,
            }).slice(0, 64),
          });
        }
      }
      const proxyButtons = availableProxies.map((proxy) => [proxy]);
      bot.sendMessage(message.chat.id, "Доступні проксі", {
        reply_markup: {
          inline_keyboard: [
            ...proxyButtons,
            [
              {
                text: `🔙 ${menuDictionary.MAIN_MENU}`,
                callback_data: JSON.stringify({
                  type: "menu",
                  button: menuDictionary.MAIN_MENU,
                }).slice(0, 64),
              },
            ],
          ],
        },
      });
    });
  } else if (cbData.button === "Поповнити гаманець") {
    bot.sendMessage(
      message.chat.id,
      "Поповнити гаманець",
      createBackToMenuMenu()
    );
  } else if (cbData.button === "Мої проксі") {
    bot.sendMessage(message.chat.id, "Мої проксі", createBackToMenuMenu());
  } else if (cbData.button === "Історія") {
    bot.sendMessage(message.chat.id, "Історія", createBackToMenuMenu());
  } else if (cbData.type === "proxyRent") {
    responceMessageAwaiting.selectedProxy = cbData.button;
    bot.sendMessage(
      message.chat.id,
      "На скільки часу ви хочете орендувати проксі?",
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "30 хв. - 0.5 usd",
                callback_data: JSON.stringify({
                  type: "rentTime",
                  time: "30 хвилин",
                  price: 0.5,
                }),
              },
              {
                text: "1 год. - 1 usd",
                callback_data: JSON.stringify({
                  type: "rentTime",
                  time: "1 годину",
                  price: 1,
                }),
              },
            ],
            [
              {
                text: "12 год. - 7 usd",
                callback_data: JSON.stringify({
                  type: "rentTime",
                  time: "12 годин",
                  price: 7,
                }),
              },
              {
                text: "24 год. - 24 usd",
                callback_data: JSON.stringify({
                  type: "rentTime",
                  time: "24 години",
                  price: 24,
                }),
              },
            ],
            [
              {
                text: "3 дні - 50 usd",
                callback_data: JSON.stringify({
                  type: "rentTime",
                  time: "3 дні",
                  price: 50,
                }),
              },
              {
                text: "7 днів - 100 usd",
                callback_data: JSON.stringify({
                  type: "rentTime",
                  time: "7 днів",
                  price: 100,
                }),
              },
            ],
            [
              {
                text: "30 днів - 300 usd",
                callback_data: JSON.stringify({
                  type: "rentTime",
                  time: "30 днів",
                  price: 300,
                }),
              },
            ],
          ],
        },
      }
    );
  } else if (cbData.type === "rentTime") {
    const selectedProxy = responceMessageAwaiting.selectedProxy;
    const rentTime = cbData.time;
    const rentPrice = cbData.price;
    bot.sendMessage(
      message.chat.id,
      `Ви хочете орендувати проксі ${selectedProxy} на ${rentTime} за ${rentPrice} usd?`,
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Так",
                callback_data: JSON.stringify({
                  type: "confirmRentYes",
                  proxyId: selectedProxy.id, // або інший унікальний ідентифікатор
                  time: rentTime,
                  price: rentPrice,
                }),
              },
              {
                text: "Ні",
                callback_data: JSON.stringify({
                  type: "menu",
                  button: menuDictionary.MAIN_MENU,
                }),
              },
            ],
          ],
        },
      }
    );
  } else if (cbData.type === "confirmRentYes") {
    responceMessageAwaiting.selectedProxy = cbData.button;
    bot.sendMessage(message.chat.id, "Виберіть спосіб оплати", {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Бінанс",
              callback_data: JSON.stringify({
                type: "binance",
              }),
            },
            {
              text: "Монобанк",
              callback_data: JSON.stringify({
                type: "monobank",
              }),
            },
          ],
        ],
      },
    });
  } else if (cbData.type === "binance") {
    const selectedProxy = responceMessageAwaiting.selectedProxy;
    const rentTime = cbData.time;
    const rentPrice = cbData.price;
    responceMessageAwaiting.selectedProxy = cbData.button;
    bot.sendMessage(
      message.chat.id,
      `Для оплати проксі ${selectedProxy} на ${rentTime} вам слід сплатити ${rentPrice} \nРеквізити рахунку Бінанс: \n `,
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Сплатив",
                callback_data: JSON.stringify({
                  type: "paid",
                }),
              },
            ],
          ],
        },
      }
    );
  } else if (cbData.type === "monobank") {
    const selectedProxy = responceMessageAwaiting.selectedProxy;
    const rentTime = cbData.time;
    const rentPrice = cbData.price;
    responceMessageAwaiting.selectedProxy = cbData.button;
    bot.sendMessage(
      message.chat.id,
      `Для оплати проксі ${selectedProxy} на ${rentTime} вам слід сплатити ${rentPrice} \nРеквізити рахунку монобанк: \n `,
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Сплатив",
                callback_data: JSON.stringify({
                  type: "paid",
                }),
              },
            ],
          ],
        },
      }
    );
  } else {
    bot.sendMessage(message.chat.id, `Ви нажали кнопку: ${cbData.button}`);
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
      bot.sendMessage(message.chat.id, "unknown text responce");
  }
}
