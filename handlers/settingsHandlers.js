import { settingsMenuDictionary } from '../UI/dictionary.js';
import { updateUserData, updateWalletDataData } from '../database/api.js';
import { createBackToMenuMenu } from '../UI/menus.js';

export default function settingsHandlers(cbData, bot, message, userData, responceMessageAwaiting) {
    responceMessageAwaiting.type = cbData.type;
    responceMessageAwaiting.lastRequestMessage = cbData.btn;
    responceMessageAwaiting.id = cbData.btn;
    if (userData.type === 'admin') {
        switch(cbData.btn) {
            case settingsMenuDictionary.ADD_NEW_ADMIN:
                bot.sendMessage(message.chat.id, `Введіть нік юзера`, createBackToMenuMenu());
                break;
            case settingsMenuDictionary.TRUST_SETTINGS:
                bot.sendMessage(message.chat.id, `Надішліть фото QR коду`, createBackToMenuMenu());
                break;
            case settingsMenuDictionary.MONOBANK_SETTINGS:
                bot.sendMessage(message.chat.id, `Введіть номер карти`, createBackToMenuMenu());
                break;
            default:
                bot.sendMessage(message.chat.id, `Ви нажали settings кнопку: ${cbData.btn}`);
        }
    } else {
        bot.sendMessage(message.chat.id, `У вас немає доступу для перегляду`);
    }
}

export function settingsResponceHandlers(responceMessageAwaiting, bot, message) {
    switch (responceMessageAwaiting.lastRequestMessage) {
      case settingsMenuDictionary.ADD_NEW_ADMIN:
        updateUserData(message.text).then((data) => {
            bot.sendMessage(
                message.chat.id,
                "Адміна додано",
                createBackToMenuMenu()
            );
            }).catch(err => {
            bot.sendMessage(
                message.chat.id,
                "Нажаль, такого юзера не знайдено",
                createBackToMenuMenu()
            );
          });
        break;
      case settingsMenuDictionary.TRUST_SETTINGS:
      case settingsMenuDictionary.MONOBANK_SETTINGS:
        updateWalletDataData(message.text).then((data) => {
            bot.sendMessage(
                message.chat.id,
                "Дані оновлено",
                createBackToMenuMenu()
            );
        });
        break;
      default:
        bot.sendMessage(message.chat.id, "unknown text responce");
    }
  }