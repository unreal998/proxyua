
import menuHandlers, { menuResponceHandlers } from "./handlers/menuHandlers.js";
import proxyMenuHandlers from "./handlers/proxyHandlers.js";


const setupHandlers = (bot, userData, responceMessageAwaiting) => {
  // Обробка натискання кнопок
  bot.on("callback_query", (callbackQuery) => {
    const message = callbackQuery.message;
    const cbData = callbackQuery.data;
    const parsedData = JSON.parse(cbData);

    switch (parsedData.type) {
      case "menu":
        menuHandlers(
          parsedData,
          bot,
          message,
          userData,
          responceMessageAwaiting
        );
        break;
      case "proxyMenu":
        proxyMenuHandlers(
          parsedData,
          bot,
          message,
          userData,
          responceMessageAwaiting
        );
        break;
      case "proxyRent":
        menuHandlers(
          parsedData,
          bot,
          message,
          userData,
          responceMessageAwaiting
        );
        break;
      case "rentTime":
        menuHandlers(
          parsedData,
          bot,
          message,
          userData,
          responceMessageAwaiting
        );
        break;
      case "confirmRentYes":
        menuHandlers(
          parsedData,
          bot,
          message,
          userData,
          responceMessageAwaiting
        );
        break;
      case "binance":
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
      case 'proxyMenu':
        proxyMenuResponceHandlers(responceMessageAwaiting, bot, msg)
        break;
      default:
        bot.sendMessage(message.chat.id, "callback type is missing");
    }
  });
};

export default setupHandlers;
