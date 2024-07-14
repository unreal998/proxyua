import { getTransactionList, getTransactionData } from "../database/api.js";
import { menuDictionary } from "../UI/dictionary.js";

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
        bot.sendMessage(chatId, "У вас немає історії орендованих проксі.");
        return;
      }

      userTransactions.sort(
        (a, b) => b.timeStampInMilliseconds - a.timeStampInMilliseconds
      );

      const lastTransactions = userTransactions.slice(0, 4);

      const buttons = lastTransactions.map((transaction) => ({
        text: `🖥️ ${transaction.proxyAddress}`,
        callback_data: JSON.stringify({
          type: "menu",
          btn: `tInfo_${transaction.id}`,
        }),
      }));

      const keyboard = buttons.map((button) => [button]);

      bot.sendMessage(chatId, "Ваші орендовані проксі:", {
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
      bot.sendMessage(chatId, "Виникла помилка при отриманні історії.");
    });
}

function showTransactionDetails(transactionId, bot, message) {
  getTransactionData(transactionId)
    .then((transaction) => {
      const details = `
        🖥️ АПІ Адреса: ${transaction.proxyAddress}
        ⏳ Час оренди: ${new Date(transaction.rentTime).toLocaleString()}
        📄 Статус: ${transaction.status}
        💰 Вартість: ${transaction.price}
        📷 Фото оплати: ${
          transaction.photoURL ? transaction.photoURL : "Відсутнє"
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
      bot.sendMessage(
        message.chat.id,
        "Виникла помилка при отриманні деталей транзакції."
      );
    });
}
