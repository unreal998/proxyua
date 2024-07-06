export const settingsMenu = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🏦 Конфігурація Монобанка",
            callback_data: JSON.stringify({
                type: 'menu',
                btn: "Конфігурація Монобанка"
              }),
          },
          { text: "💳 Конфігурація Trust", callback_data: JSON.stringify({
            type: 'menu',
            btn: "Конфігурація Trust"
          }) },
        ],
        [{ text: "🔙 Назад", callback_data: JSON.stringify({
            type: 'menu',
            btn: "Назад"
          })}],
      ],
    },
    text: "Ви вибрали налаштування",
  };