const addProxyMenu = {
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
    text: "Додати проксі",
  };