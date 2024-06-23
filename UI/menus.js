import { menuDictionary } from "./dictionary.js";
const adminMenu = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: `🌐 ${menuDictionary.PROXY_LIST}`, callback_data: JSON.stringify({
          type: 'menu',
          button: menuDictionary.PROXY_LIST
        })},
        { text: `➕ ${menuDictionary.ADD_PROXY}`, callback_data: JSON.stringify({
          type: 'menu',
          button: menuDictionary.ADD_PROXY
        })},
      ],
      [
        { text: "📋 Відкриті заявки", callback_data: JSON.stringify({
          type: 'menu',
          button: "Відкриті заявки"
        })},
        { text: "⚙️ Налаштування", callback_data: JSON.stringify({
          type: 'menu',
          button: "Налаштування"
        })}
      ],
    ],
  },
};

// Меню для юзерів
const userMenu = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: "📡 Арендувати проксі", callback_data: JSON.stringify({
          type: 'menu',
          button: 'Доступні проксі'
        }) },
        { text: "💰 Поповнити гаманець", callback_data: JSON.stringify({
          type: 'menu',
          button: 'Доступні проксі'
        }) },
      ],
      [
        { text: "🖥️ Мої проксі", callback_data: JSON.stringify({
          type: 'menu',
          button: 'Мої проксі'
        }) },
        { text: "📊 Мої транзакції", callback_data: JSON.stringify({
          type: 'menu',
          button: 'Мої проксі'
        }) },
      ],
      [{ text: "⚙️ Налаштування", callback_data: JSON.stringify({
        type: 'menu',
        button: 'Мої проксі'
      }) }],
    ],
  },
};

// Створення меню з кнопкою "Назад"
const createBackMenu = (text) => ({
  reply_markup: {
    inline_keyboard: [[{ text: "🔙 Назад", callback_data:  JSON.stringify({
      type: 'menu',
      button: "Назад"
    })}]],
  },
  text: `Ви вибрали ${text}`,
});

export { adminMenu, userMenu, createBackMenu };
