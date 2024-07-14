import menuHandlers, { menuResponceHandlers } from "./handlers/menuHandlers.js";
import proxyMenuHandlers, {
  proxyMenuResponceHandlers,
} from "./handlers/proxyHandlers.js";
import transactionMenuHandlers from "./handlers/transactionHandlers.js";
import proxyRentHandlers, {
  proxyRentResponceHandlers,
} from "./handlers/proxyRentHandlers.js";
import settingsHandlers, {
  settingsResponceHandlers,
} from "./handlers/settingsHandlers.js";
import userProxyHistoryHandler from "./handlers/userProxyHistory.js";

const setupHandlers = (
  bot,
  userData,
  responceMessageAwaiting,
  selectedProxyByUser
) => {
  bot.on("callback_query", (callbackQuery) => {
    const message = callbackQuery.message;
    const cbData = JSON.parse(callbackQuery.data);

    if (cbData.btn && cbData.btn.startsWith("tInfo_")) {
      userProxyHistoryHandler(cbData, bot, message);
      return;
    }

    switch (cbData.type) {
      case "plMenu":
        proxyMenuHandlers(
          cbData,
          bot,
          message,
          userData,
          responceMessageAwaiting
        );
        break;
      case "menu":
        if (cbData.btn === "Історія") {
          userProxyHistoryHandler(cbData, bot, message);
        } else {
          menuHandlers(cbData, bot, message, userData, responceMessageAwaiting);
        }
        break;
      case "rent":
        proxyRentHandlers(
          cbData,
          bot,
          message,
          userData,
          responceMessageAwaiting,
          selectedProxyByUser
        );
        break;
      case "tMenu":
        transactionMenuHandlers(
          cbData,
          bot,
          message,
          userData,
          responceMessageAwaiting
        );
        break;
      case "smenu":
        settingsHandlers(
          cbData,
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
    if (responceMessageAwaiting?.type) {
      switch (responceMessageAwaiting.type) {
        case "menu":
          if (responceMessageAwaiting.lastRequestMessage === "Історія") {
            userProxyHistoryHandler(responceMessageAwaiting, bot, msg);
          } else {
            menuResponceHandlers(responceMessageAwaiting, bot, msg);
          }
          break;
        case "plMenu":
          proxyMenuResponceHandlers(responceMessageAwaiting, bot, msg);
          break;
        case "smenu":
          settingsResponceHandlers(responceMessageAwaiting, bot, msg);
          break;
        case "tMenu":
          transactionMenuHandlers(responceMessageAwaiting, bot, msg);
          break;
        case "rent":
          proxyRentResponceHandlers(
            responceMessageAwaiting,
            bot,
            msg,
            selectedProxyByUser
          );
          break;
        default:
          bot.sendMessage(message.chat.id, "callback type is missing");
      }
    }
  });
};

export default setupHandlers;
