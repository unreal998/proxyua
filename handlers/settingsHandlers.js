import { settingsMenuDictionary } from '../UI/dictionary.js';
import { updateUserData, updateWalletData } from '../database/api.js';
import { createBackToMenuMenu } from '../UI/menus.js';
import { TOKEN } from '../constants.js';

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
        const fileId = message.photo[message.photo.length - 1].file_id;
        bot
          .getFile(fileId)
          .then((file) => {
            const filePath = file.file_path;
            const fileUrl = `https://api.telegram.org/file/bot${TOKEN}/${filePath}`;
            updateWalletData(fileUrl, responceMessageAwaiting.lastRequestMessage).then((data) => {
                bot.sendMessage(
                    message.chat.id,
                    `Дані ${data.name} оновлено: ${data.value}`,
                    createBackToMenuMenu()
                );
            });
          })
        break;
      case settingsMenuDictionary.MONOBANK_SETTINGS:
        updateWalletData(message.text, responceMessageAwaiting.lastRequestMessage).then((data) => {
            bot.sendMessage(
                message.chat.id,
                `Дані ${data.name} оновлено: ${data.value}`,
                createBackToMenuMenu()
            );
        });
        break;
      default:
        bot.sendMessage(message.chat.id, "unknown settings text responce");
    }
  }