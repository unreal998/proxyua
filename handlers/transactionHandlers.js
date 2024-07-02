import { transactionListMenu } from '../UI/dictionary.js';

export default function transactionMenuHandlers(cbData, bot, message, userData, responceMessageAwaiting) {
    if (userData.type === 'admin') {
        responceMessageAwaiting.type = cbData.type;
        responceMessageAwaiting.lastRequestMessage = cbData.button;
        responceMessageAwaiting.id = cbData.button;
        switch(cbData.button) {
            case transactionListMenu.INFO:
                getProxyData(cbData.id).then(data => {
                    bot.sendMessage(message.chat.id, `
                        Id: ${data.address} \n
Сума: ${data.value} \n
Статус: ${data.status}\n
Адреса: ${data.proxyAddress}\n
Тривалість ${new Date(data.timeInMilliseconds).toLocaleString()}`, createBackToMenuMenu());
                })
                break;
            case transactionListMenu.APPROVE:
                bot.sendMessage(message.chat.id, `Ви впевнені що хочете видалити ${cbData.button}?`);
                break;
            case transactionListMenu.DECLINE:
                bot.sendMessage(message.chat.id, `Ви впевнені що хочете видалити ${cbData.button}?`);
                break;
            default:
                bot.sendMessage(message.chat.id, `Ви нажали кнопку: ${cbData.button}`);
        }
    } else {
        bot.sendMessage(message.chat.id, `У вас немає доступу для перегляду`);
    }
}