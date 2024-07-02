export function generateTransactionListMenu(list) {
    return {
        reply_markup: {
            inline_keyboard: list
        }
    }
}