export function generateProxyListMenu(list) {
    return {
        reply_markup: {
            inline_keyboard: list
        }
    }
}