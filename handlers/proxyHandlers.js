import { proxyListMenu } from "../UI/dictionary.js";
import { editProxyMenu } from "../UI/proxyList.js";

export default function proxyMenuHandlers(cbData, bot, message, userData, responceMessageAwaiting) {
    if (userData.type === 'admin') {
        responceMessageAwaiting.type = 'proxyMenu';
        responceMessageAwaiting.lastRequestMessage = cbData.button;
        switch(cbData.button) {
            case proxyListMenu.EDIT:
                bot.sendMessage(message.chat.id, `Редагувати`, editProxyMenu);
                break;
            case proxyListMenu.REMOVE:
                bot.sendMessage(message.chat.id, `Ви впевнені що хочете видалити ${cbData.button}?`);
                break;
            default:
                bot.sendMessage(message.chat.id, `Ви нажали кнопку: ${cbData.button}`);
        }
    } else {
        bot.sendMessage(message.chat.id, `У вас немає доступу для перегляду`);
    }
}