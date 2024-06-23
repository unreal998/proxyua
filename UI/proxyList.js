import { proxyListMenu } from './dictionary.js'

export function generateProxyListMenu(list) {
    return {
        reply_markup: {
            inline_keyboard: list
        }
    }
}

export const editProxyMenu = {
    reply_markup: {
        inline_keyboard: [
            [
                {
                    text: proxyListMenu.EDIT_LOGIN, callback_data: JSON.stringify({
                        type: 'proxyMenu',
                        button: proxyListMenu.EDIT_LOGIN
                      })
                },
                {
                    text: proxyListMenu.EDIT_PASSWORD, callback_data: JSON.stringify({
                        type: 'proxyMenu',
                        button: proxyListMenu.EDIT_LOGIN
                      })
                },
                {
                    text: proxyListMenu.EDIT_ADDRESS, callback_data: JSON.stringify({
                        type: 'proxyMenu',
                        button: proxyListMenu.EDIT_LOGIN
                      })
                },
            ]
        ]
    }
}