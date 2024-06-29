import menuHandlers, { menuResponceHandlers } from "./handlers/menuHandlers.js";
import proxyMenuHandlers from "./handlers/proxyHandlers.js";
import { selectedProxyByUser } from "./data/selectedProxyByUser.js";
import { TOKEN } from "./constants.js"; // Переконайтеся, що цей файл існує і TOKEN вірно заданий

const setupHandlers = (bot, userData, responceMessageAwaiting) => {
  // Обробка натискання кнопок
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
        menuHandlers(
          parsedData,
          bot,
          message,
          userData,
          responceMessageAwaiting
        );
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
            "Скрін проплати отримано. Дякуємо! \nСтатус вашої заявки - в очікуванні"
          );

          console.log(selectedProxyByUser);
        })
        .catch((error) => {
          console.error("Помилка при отриманні файлу:", error);
        });
    }
  });
};

export default setupHandlers;
