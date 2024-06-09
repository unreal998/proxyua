// Головне меню для адміна
const adminMenu = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: "🌐 Доступні проксі", callback_data: "Доступні проксі" },
        { text: "📈 Останні транзакції", callback_data: "Останні транзакції" },
      ],
      [
        { text: "📋 Відкриті заявки", callback_data: "Відкриті заявки" },
        { text: "🔍 Статус проксі", callback_data: "Статус проксі" },
      ],
      [{ text: "⚙️ Налаштування", callback_data: "Налаштування" }],
    ],
  },
};

// Меню для юзерів
const userMenu = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: "📡 Арендувати проксі", callback_data: "Арендувати проксі" },
        { text: "💰 Поповнити гаманець", callback_data: "Поповнити гаманець" },
      ],
      [
        { text: "🖥️ Мої проксі", callback_data: "Мої проксі" },
        { text: "📊 Мої транзакції", callback_data: "Мої транзакції" },
      ],
      [{ text: "⚙️ Налаштування", callback_data: "Налаштування" }],
    ],
  },
};

// Меню налаштувань
const settingsMenu = {
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "🏦 Конфігурація Монобанка",
          callback_data: "Конфігурація Монобанка",
        },
        { text: "💳 Конфігурація Trust", callback_data: "Конфігурація Trust" },
      ],
      [{ text: "🔙 Назад", callback_data: "Назад" }],
    ],
  },
  text: "Ви вибрали налаштування",
};

// Створення меню з кнопкою "Назад"
const createBackMenu = (text) => ({
  reply_markup: {
    inline_keyboard: [[{ text: "🔙 Назад", callback_data: "Назад" }]],
  },
  text: `Ви вибрали ${text}`,
});

export { adminMenu, userMenu, settingsMenu, createBackMenu };
