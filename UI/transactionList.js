import { menuDictionary } from './dictionary.js';

export function generateTransactionListMenu(list) {
    return {
        reply_markup: {
            inline_keyboard: [...list, [{
                text: `🔙 ${menuDictionary.MAIN_MENU}`,
                callback_data: JSON.stringify({
                  type: "menu",
                  btn: menuDictionary.MAIN_MENU,
                }),
              }],],
        }
    }
}

export function generateTransactionControls(list) {
    return {
      reply_markup: {
          inline_keyboard: [...list, [{
              text: `🔙 ${menuDictionary.MAIN_MENU}`,
              callback_data: JSON.stringify({
                type: "menu",
                btn: menuDictionary.MAIN_MENU,
              }),
            }],],
      }
    }
}