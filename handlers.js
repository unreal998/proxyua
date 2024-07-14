import menuHandlers, { menuResponceHandlers } from "./handlers/menuHandlers.js";
import proxyMenuHandlers, { proxyMenuResponceHandlers } from "./handlers/proxyHandlers.js";
import transactionMenuHandlers from './handlers/transactionHandlers.js';
import proxyRentHandlers, { proxyRentResponceHandlers } from './handlers/proxyRentHandlers.js';
import settingsHandlers, { settingsResponceHandlers } from './handlers/settingsHandlers.js';

const setupHandlers = (bot, userData, responceMessageAwaiting, selectedProxyByUser) => {
  bot.on("callback_query", (callbackQuery) => {
    const message = callbackQuery.message;
    const cbData = callbackQuery.data;
    const parsedData = JSON.parse(cbData);
    switch (parsedData.type) {
      case "plMenu":
        proxyMenuHandlers(
          parsedData,
          bot,
          message,
          userData,
          responceMessageAwaiting
        );
        break;
      case "menu":
        menuHandlers(
          parsedData,
          bot,
          message,
          userData,
          responceMessageAwaiting
        );
        break;
      case "rent":
        proxyRentHandlers(
          parsedData,
          bot,
          message,
          userData,
          responceMessageAwaiting,
          selectedProxyByUser
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
    if (responceMessageAwaiting?.type) {
      switch (responceMessageAwaiting.type) {
        case "menu":
          menuResponceHandlers(responceMessageAwaiting, bot, msg);
          break;
        case "plMenu":
          proxyMenuResponceHandlers(responceMessageAwaiting, bot, msg);
          break;
        case 'smenu':
          settingsResponceHandlers(responceMessageAwaiting, bot, msg);
          break;
        case "tMenu":
          transactionMenuHandlers(responceMessageAwaiting, bot, msg);
          break;
        case "rent":
          proxyRentResponceHandlers(responceMessageAwaiting, bot, msg, selectedProxyByUser);
          break;
        default:
          bot.sendMessage(message.chat.id, "callback type is missing");
      }
    }
  });
};

export default setupHandlers;
