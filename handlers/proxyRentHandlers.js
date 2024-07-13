import { randomUUID } from "crypto";
import { rentMenuDictionary, menuDictionary } from '../UI/dictionary.js'
import { TOKEN } from "../constants.js";
import { addNewTransaction } from '../database/api.js';

export default function proxyRentHandlers(  
    cbData,
    bot,
    message,
    userData,
    responceMessageAwaiting,
    selectedProxyByUser
) {
    responceMessageAwaiting.type = cbData.type;
    responceMessageAwaiting.lastRequestMessage = cbData.btn;
    responceMessageAwaiting.id = cbData.btn;
    switch(cbData.btn) {    
        case rentMenuDictionary.RENT_ADDRESS:
            selectedProxyByUser.proxyAddress = cbData.ad;
            bot.sendMessage(
                message.chat.id,
                "На скільки часу ви хочете орендувати проксі?",
                {
                  reply_markup: {
                    inline_keyboard: [
                      [
                        {
                          text: "30 хв. - 0.5 usd",
                          callback_data: JSON.stringify({
                            type: cbData.type,
                            btn: rentMenuDictionary.RENT_TIME,
                            time: 1800000,
                            price: 0.5,
                          }),
                        },
                        {
                          text: "1 год. - 1 usd",
                          callback_data: JSON.stringify({
                            type: cbData.type,
                            btn: rentMenuDictionary.RENT_TIME,
                            time: 3600000,
                            price: 1,
                          }),
                        },
                      ],
                      [
                        {
                          text: "12 год. - 7 usd",
                          callback_data: JSON.stringify({
                            type: cbData.type,
                            btn: rentMenuDictionary.RENT_TIME,
                            time: 43200000,
                            price: 7,
                          }),
                        },
                        {
                          text: "24 год. - 24 usd",
                          callback_data: JSON.stringify({
                            type: cbData.type,
                            btn: rentMenuDictionary.RENT_TIME,
                            time: 86400000,
                            price: 24,
                          }),
                        },
                      ],
                      [
                        {
                          text: "3 дні - 50 usd",
                          callback_data: JSON.stringify({
                            type: cbData.type,
                            btn: rentMenuDictionary.RENT_TIME,
                            time: 259200000,
                            price: 50,
                          }),
                        },
                        {
                          text: "7 днів - 100 usd",
                          callback_data: JSON.stringify({
                            type: cbData.type,
                            btn: rentMenuDictionary.RENT_TIME,
                            time: 604800000,
                            price: 100,
                          }),
                        },
                      ],
                      [
                        {
                          text: "30 днів - 300 usd",
                          callback_data: JSON.stringify({
                            type: cbData.type,
                            btn: rentMenuDictionary.RENT_TIME,
                            time: 2592000000,
                            price: 300,
                          }),
                        },
                      ],
                    ],
                  },
                }
              );
            break;
        case rentMenuDictionary.RENT_TIME:
            const rentTime = cbData.time;
            const rentPrice = cbData.price;
            selectedProxyByUser.rentTime = rentTime;
            selectedProxyByUser.price = rentPrice;
            selectedProxyByUser.timeStampInMilliseconds = Date.now();
            bot.sendMessage(
            message.chat.id,
            `Ви хочете орендувати проксі ${selectedProxyByUser.proxyAddress} на ${Date.now(rentTime)} за ${rentPrice} usd?`,
            {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: "Так",
                                callback_data: JSON.stringify({
                                btn: "Yes",
                                type: cbData.type,
                                proxyId: selectedProxyByUser.id,
                                }),
                            },
                        {
                            text: "Ні",
                            callback_data: JSON.stringify({
                            type: "menu",
                            btn: menuDictionary.MAIN_MENU,
                            }),
                        },
                        ],
                    ],
                },
            });
            break;
        case 'Yes':
            bot.sendMessage(message.chat.id, "Виберіть спосіб оплати", {
                reply_markup: {
                  inline_keyboard: [
                    [
                      {
                        text: rentMenuDictionary.BINANCE,
                        callback_data: JSON.stringify({
                            type: cbData.type,
                            btn: rentMenuDictionary.BINANCE,
                        }),
                      },
                      {
                        text: rentMenuDictionary.MONOBANK,
                        callback_data: JSON.stringify({
                            type: cbData.type,
                            btn: rentMenuDictionary.MONOBANK,
                        }),
                      },
                    ],
                  ],
                },
            });
            break;
        case rentMenuDictionary.BINANCE:
            bot.sendMessage(
                message.chat.id,
                `Для оплати проксі ${selectedProxyByUser.proxyAddress} на ${selectedProxyByUser.rentTime} вам слід сплатити ${selectedProxyByUser.price} usd \nРеквізити рахунку Бінанс: \n `,
                {
                  reply_markup: {
                    inline_keyboard: [
                      [
                        {
                          text: "Сплатив",
                          callback_data: JSON.stringify({
                            type: cbData.type,
                            btn: rentMenuDictionary.PAID,
                          }),
                        },
                      ],
                    ],
                  },
                }
              );
            break;
        case rentMenuDictionary.MONOBANK:
            bot.sendMessage(
                message.chat.id,
                `Для оплати проксі ${selectedProxyByUser.proxyAddress} на ${selectedProxyByUser.rentTime} вам слід сплатити ${selectedProxyByUser.price} usd \nРеквізити рахунку монобанк: \n `,
                {
                  reply_markup: {
                    inline_keyboard: [
                      [
                        {
                          text: "Сплатив",
                          callback_data: JSON.stringify({
                            type: cbData.type,
                            btn: rentMenuDictionary.PAID,
                          }),
                        },
                      ],
                    ],
                  },
                }
            );
            break;
        case rentMenuDictionary.PAID:
            bot.sendMessage(message.chat.id, `Прикріпіть, будь-ласка, скрін проплати`);
            break;
        default:
            bot.sendMessage(message.chat.id, `Ви нажали proxy кнопку: ${cbData.btn}`);
    }
}

export function proxyRentResponceHandlers(
    responceMessageAwaiting,
    bot,
    message,
    selectedProxyByUser
  ) {
    switch (responceMessageAwaiting.lastRequestMessage) {
        case rentMenuDictionary.PAID:
            if (message.photo) {
                const fileId = message.photo[message.photo.length - 1].file_id;
                bot
                  .getFile(fileId)
                  .then((file) => {
                    const filePath = file.file_path;
                    const fileUrl = `https://api.telegram.org/file/bot${TOKEN}/${filePath}`;
          
                    selectedProxyByUser.photoURL = fileUrl;
          
                    selectedProxyByUser.id = randomUUID().slice(0, 9);
                    addNewTransaction(selectedProxyByUser).then(() => {
                      bot.sendMessage(
                        message.chat.id,
                      "Скрін проплати отримано. Дякуємо! \nСтатус вашої заявки - в очікуванні",
                      {
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
                      
                    });
                  })
                  .catch((error) => {
                    console.error("Помилка при отриманні файлу:", error);
                  });
              }
              break;
        default:
            bot.sendMessage(message.chat.id, "unknown text responce");
    }
  }