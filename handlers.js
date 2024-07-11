import menuHandlers, { menuResponceHandlers } from "./handlers/menuHandlers.js";
import proxyMenuHandlers, { proxyMenuResponceHandlers } from "./handlers/proxyHandlers.js";
import transactionMenuHandlers from './handlers/transactionHandlers.js';
import settingsHandlers, { settingsResponceHandlers } from './handlers/settingsHandlers.js';
import { addNewTransaction } from "./database/api.js";

import { selectedProxyByUser } from "./data/selectedProxyByUser.js";
import { TOKEN } from "./constants.js";

import { v4 as uuidv4 } from "uuid";
import { menuDictionary } from "./UI/dictionary.js";

const setupHandlers = (bot, userData, responceMessageAwaiting) => {
  bot.on("callback_query", (callbackQuery) => {
    const message = callbackQuery.message;
    const cbData = callbackQuery.data;
    const parsedData = JSON.parse(cbData);

    switch (parsedData.type) {
      case "proxyMenu":
        proxyMenuHandlers(
          parsedData,
          bot,
          message,
          userData,
          responceMessageAwaiting
        );
        break;
      case "menu":
      case "proxyRent":
      case "rentTime":
      case "confirmRentYes":
      case "binance":
      case "monobank":
      case "paid":
      case "transactionInfo":
        menuHandlers(
          parsedData,
          bot,
          message,
          userData,
          responceMessageAwaiting
        );
        break;
      case 'tMenu':
        transactionMenuHandlers(
          parsedData,
          bot,
          message,
          userData,
          responceMessageAwaiting
        );
        break;
      case 'smenu':
        settingsHandlers(parsedData,
          bot,
          message,
          userData,
          responceMessageAwaiting); 
          break;
      default:
        bot.sendMessage(message.chat.id, "callback type is missing");
    }
  });

  bot.on("message", (msg) => {
    switch (responceMessageAwaiting.type) {
      case "menu":
        menuResponceHandlers(responceMessageAwaiting, bot, msg);
        break;
      case "proxyMenu":
        proxyMenuResponceHandlers(responceMessageAwaiting, bot, msg);
        break;
      case 'smenu':
        settingsResponceHandlers(responceMessageAwaiting, bot, msg);
      case "transactionMenu":
        transactionMenuHandlers(responceMessageAwaiting, bot, msg);
        break;
      default:
        bot.sendMessage(message.chat.id, "callback type is missing");
    }

    if (msg.photo) {
      const fileId = msg.photo[msg.photo.length - 1].file_id;

      bot
        .getFile(fileId)
        .then((file) => {
          const filePath = file.file_path;
          const fileUrl = `https://api.telegram.org/file/bot${TOKEN}/${filePath}`;

          selectedProxyByUser.photoURL = fileUrl;

          bot.sendMessage(
            msg.chat.id,
            "Скрін проплати отримано. Дякуємо! \nСтатус вашої заявки - в очікуванні",
            {
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: `🔙 ${menuDictionary.MAIN_MENU}`,
                      callback_data: JSON.stringify({
                        type: "menu",
                        button: menuDictionary.MAIN_MENU,
                      }).slice(0, 64),
                    },
                  ],
                ],
              },
            }
          );
          selectedProxyByUser.id = selectedProxyByUser.id = uuidv4();

          addNewTransaction(selectedProxyByUser);
        })
        .catch((error) => {
          console.error("Помилка при отриманні файлу:", error);
        });
    }
  });
};

export default setupHandlers;
