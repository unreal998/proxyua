import { menuDictionary, userMenuDictionary } from "./dictionary.js";

const adminMenu = {
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: `🌐 ${menuDictionary.PROXY_LIST}`,
          callback_data: JSON.stringify({
            type: "menu",
            btn: menuDictionary.PROXY_LIST,
          }),
        },
        {
          text: `➕ ${menuDictionary.ADD_PROXY}`,
          callback_data: JSON.stringify({
            type: "menu",
            btn: menuDictionary.ADD_PROXY,
          }),
        },
      ],
      [
        {
          text: `📋 ${menuDictionary.PENDING_TRANSACTIONS}`,
          callback_data: JSON.stringify({
            type: "menu",
            btn: menuDictionary.PENDING_TRANSACTIONS,
          }),
        },
        {
          text: `⚙️ ${menuDictionary.SETTINGS}`,
          callback_data: JSON.stringify({
            type: "menu",
            btn: menuDictionary.SETTINGS,
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
            btn: `${userMenuDictionary.RENT}`,
          }),
        },
        {
          text: `📊 Історія`,
          callback_data: JSON.stringify({
            type: "menu",
            btn: "Історія",
          }),
        },
      ],
      [
        {
          text: `⚙️ Налаштування`,
          callback_data: JSON.stringify({
            type: "menu",
            btn: "Мої проксі",
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
            btn: menuDictionary.MAIN_MENU,
          }),
        },
      ],
    ],
  },
});

export { adminMenu, userMenu, createBackToMenuMenu };
