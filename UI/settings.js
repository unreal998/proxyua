import { settingsMenuDictionary, menuDictionary } from "./dictionary.js";

export const adminSettingsMenu = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: `🏦 ${settingsMenuDictionary.MONOBANK_SETTINGS}`, callback_data: JSON.stringify({
                type: 'smenu',
                btn: `${settingsMenuDictionary.MONOBANK_SETTINGS}`
              }),
          },
          { text: `💳 ${settingsMenuDictionary.TRUST_SETTINGS}`, callback_data: JSON.stringify({
              type: 'smenu',
              btn: `${settingsMenuDictionary.TRUST_SETTINGS}`
            }), 
          },
          { text: `💳 ${settingsMenuDictionary.ADD_NEW_ADMIN}`, callback_data: 
              JSON.stringify({
                type: 'smenu',
                btn: `${settingsMenuDictionary.ADD_NEW_ADMIN}`
              }), 
          },
        ],
        [{ text: "🔙 Назад", callback_data: JSON.stringify({
            type: 'menu',
            btn: menuDictionary.MAIN_MENU
          })}],
      ],
    }
  };