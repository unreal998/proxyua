import { transactionListMenu } from '../UI/dictionary.js';
import { getTransactionData, approveTransaction, declineTransaction, updateProxyByAddressData, getUserData } from '../database/api.js';
import { createBackToMenuMenu } from '../UI/menus.js';
import { generateTransactionControls } from '../UI/transactionList.js';

export default function transactionMenuHandlers(cbData, bot, message, userData, responceMessageAwaiting) {
    if (userData.type === 'admin') {
        responceMessageAwaiting.type = cbData.type;
        responceMessageAwaiting.lastRequestMessage = cbData.btn;
        responceMessageAwaiting.id = cbData.btn;
        switch(cbData.btn) {
            case transactionListMenu.INFO:
                getTransactionData(cbData.id).then(data => {
                    const list = [];
                    const declineButton = {
                        text: transactionListMenu.DECLINE,
                        callback_data: JSON.stringify({
                            type: "tMenu",
                            id: data.id,
                            btn: transactionListMenu.DECLINE,
                        }),
                        };
                    const approveButton = {
                        text: transactionListMenu.APPROVE,
                        callback_data: JSON.stringify({
                            type: "tMenu",
                            id: data.id,
                            btn: transactionListMenu.APPROVE,
                        }),
                    };
                    list.push([approveButton, declineButton]);
                    bot.sendMessage(message.chat.id, `
                        Id: ${data.id} \n
Сума: ${data.price} \n
Статус: ${data.status}\n
Адреса: ${data.proxyAddress}\n
Тривалість ${new Date(data.rentTime).getHours()} години`, generateTransactionControls(list));
                })
                break;
            case transactionListMenu.APPROVE:
                approveTransaction(cbData.id).then(data => {
                    const expirationDate = new Date(Date.now() + data.rentTime);
                    getUserData(data.chatId).then(userData => {
                        bot.sendMessage(message.chat.id, `Заявка прийнята ${data.id}`, createBackToMenuMenu());
                        const expirationDateString = expirationDate.toLocaleString();
                        bot.sendMessage(data.chatId, `Проксі ${data.proxyAddress} дійсний, до ${expirationDateString}`)
                        const proxyData = {
                            ...data,
                            status: false,
                            rentEnd: expirationDate.getTime(),
                            rentedBy: "https://t.me/" + userData.userName
                        }
                        updateProxyByAddressData(proxyData, data.proxyAddress);
                    })

                });
                break;
            case transactionListMenu.DECLINE:
                declineTransaction(cbData.id).then(data => {
                    bot.sendMessage(message.chat.id, `Заявка відхилина ${data.id}?`, createBackToMenuMenu());
                });
                break;
            default:
                bot.sendMessage(message.chat.id, `Ви нажали transaction кнопку: ${cbData.btn}`);
        }
    } else {
        bot.sendMessage(message.chat.id, `У вас немає доступу для перегляду`);
    }
}
