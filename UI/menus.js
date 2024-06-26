import { menuDictionary, userMenuDictionary } from "./dictionary.js";

const adminMenu = {
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: `🌐 ${menuDictionary.PROXY_LIST}`,
          callback_data: JSON.stringify({
            type: "menu",
            button: menuDictionary.PROXY_LIST,
          }),
        },
        {
          text: `➕ ${menuDictionary.ADD_PROXY}`,
          callback_data: JSON.stringify({
            type: "menu",
            button: menuDictionary.ADD_PROXY,
          }),
        },
      ],
      [
        {
          text: "📋 Відкриті заявки",
          callback_data: JSON.stringify({
            type: "menu",
            button: "Відкриті заявки",
          }),
        },
        {
          text: `⚙️ ${menuDictionary.SETTINGS}`,
          callback_data: JSON.stringify({
            type: "menu",
            button: menuDictionary.SETTINGS,
          }),
        },
      ],
    ],
  },
};

// Меню для юзерів
const userMenu = {
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: `📡 ${userMenuDictionary.RENT}`,
          callback_data: JSON.stringify({
            type: "menu",
            button: `${userMenuDictionary.RENT}`,
          }),
        },
        {
          text: `📊 Історія`,
          callback_data: JSON.stringify({
            type: "menu",
            button: "Історія",
          }),
        },
      ],
      [
        {
          text: `⚙️ Налаштування`,
          callback_data: JSON.stringify({
            type: "menu",
            button: "Мої проксі",
          }),
        },
      ],
    ],
  },
};

// Створення меню з кнопкою "Назад"
const createBackToMenuMenu = () => ({
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: `🔙 ${menuDictionary.MAIN_MENU}`,
          callback_data: JSON.stringify({
            type: "menu",
            button: menuDictionary.MAIN_MENU,
          }),
        },
      ],
    ],
  },
});

export { adminMenu, userMenu, createBackToMenuMenu };
