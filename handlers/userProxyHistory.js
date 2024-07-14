import { getTransactionList, getTransactionData } from "../database/api.js";
import { menuDictionary, userHistoryMenu } from "../UI/dictionary.js";

export default function userProxyHistoryHandler(cbData, bot, message) {
  const chatId = message.chat.id;

  if (cbData.btn && cbData.btn.startsWith("tInfo_")) {
    const transactionId = cbData.btn.split("_")[1];
    showTransactionDetails(transactionId, bot, message);
    return;
  }

  getTransactionList()
    .then((transactions) => {
      const userTransactions = Object.values(transactions).filter(
        (transaction) => transaction.chatId === chatId
      );

      if (userTransactions.length === 0) {
        bot.sendMessage(chatId, userHistoryMenu.EMPTY);
        return;
      }

      const lastTransactions = userTransactions
        .sort((a, b) => a.timeStampInMilliseconds - b.timeStampInMilliseconds)
        .slice(-4);

      const buttons = lastTransactions.map((transaction) => ({
        text: `🖥️ ${transaction.proxyAddress}`,
        callback_data: JSON.stringify({
          type: "menu",
          btn: `tInfo_${transaction.id}`,
        }),
      }));

      const keyboard = buttons.map((button) => [button]);

      bot.sendMessage(chatId, userHistoryMenu.HISTORY_HEADER, {
        reply_markup: {
          inline_keyboard: [
            ...keyboard,
            [
              {
                text: `🔙 ${menuDictionary.MAIN_MENU}`,
                callback_data: JSON.stringify({
                  type: "menu",
                  btn: menuDictionary.MAIN_MENU,
                }),
              },
            ],
          ],
        },
      });
    })
    .catch((err) => {
      console.error("Error fetching transactions:", err);
      bot.sendMessage(chatId, userHistoryMenuю.ERROR);
    });
}

function getFormattedRentTime(rentTime) {
  switch (rentTime) {
    case 1800000:
      return userHistoryMenu.TIME_1;
    case 3600000:
      return userHistoryMenu.TIME_2;
    case 43200000:
      return userHistoryMenu.TIME_3;
    case 86400000:
      return userHistoryMenu.TIME_4;
    case 259200000:
      return userHistoryMenu.TIME_5;
    case 604800000:
      return userHistoryMenu.TIME_6;
    case 2592000000:
      return userHistoryMenu.TIME_7;
    default:
      return `${rentTime} мс`;
  }
}

function showTransactionDetails(transactionId, bot, message) {
  getTransactionData(transactionId)
    .then((transaction) => {
      const formattedRentTime = getFormattedRentTime(transaction.rentTime);
      const details = `
${userHistoryMenu.PROXY} ${transaction.proxyAddress}\n
${userHistoryMenu.RENT_TIME} ${formattedRentTime}\n
${userHistoryMenu.STATUS} ${transaction.status}\n
${userHistoryMenu.PRICE} ${transaction.price} usd\n
${userHistoryMenu.PHOTO} ${
        transaction.photoURL
          ? transaction.photoURL
          : userHistoryMenu.PHOTO_NOT_FOUND
      }
      `;

      bot.sendMessage(message.chat.id, details, {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: `🔙 ${menuDictionary.MAIN_MENU}`,
                callback_data: JSON.stringify({
                  type: "menu",
                  btn: menuDictionary.MAIN_MENU,
                }),
              },
            ],
          ],
        },
      });
    })
    .catch((err) => {
      console.error("Error fetching transaction details:", err);
      bot.sendMessage(message.chat.id, userHistoryMenu.ERROR_HISTORY);
    });
}
