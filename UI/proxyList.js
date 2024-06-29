import { proxyListMenu } from './dictionary.js'
import { menuDictionary } from "./dictionary.js";

export function generateProxyListMenu(list) {
    return {
        reply_markup: {
            inline_keyboard: list
        }
    }
}

export function generateEditProxyMenu(id) {
    return {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: proxyListMenu.EDIT_LOGIN, callback_data: JSON.stringify({
                            type: 'proxyMenu',
                            id: id,
                            button: proxyListMenu.EDIT_LOGIN,
                          })
                    },
                    {
                        text: proxyListMenu.EDIT_PASSWORD, callback_data: JSON.stringify({
                            type: 'proxyMenu',
                            id: id,
                            button: proxyListMenu.EDIT_PASSWORD,
                          })
                    },
                    {
                        text: proxyListMenu.EDIT_ADDRESS, callback_data: JSON.stringify({
                            type: 'proxyMenu',
                            id: id,
                            button: proxyListMenu.EDIT_ADDRESS,
                          })
                    },
                ],
                [
                    {
                      text: `🔙 ${menuDictionary.MAIN_MENU}`,
                      callback_data: JSON.stringify({
                        type: "menu",
                        button: menuDictionary.MAIN_MENU,
                      }),
                    },
                ],
            ]
        }
    }
}
