export const settingsMenu = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🏦 Конфігурація Монобанка",
            callback_data: JSON.stringify({
                type: 'menu',
                button: "Конфігурація Монобанка"
              }),
          },
          { text: "💳 Конфігурація Trust", callback_data: JSON.stringify({
            type: 'menu',
            button: "Конфігурація Trust"
          }) },
        ],
        [{ text: "🔙 Назад", callback_data: JSON.stringify({
            type: 'menu',
            button: "Назад"
          })}],
      ],
    },
    text: "Ви вибрали налаштування",
  };