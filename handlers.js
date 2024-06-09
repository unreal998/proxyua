import { adminMenu, userMenu, settingsMenu, createBackMenu } from "./menus.js";
import { allowedUsers } from "./constants.js";

const setupHandlers = (bot) => {
  // Обробка команди /start
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const userName = msg.from.first_name;
    const username = msg.from.username;

    if (allowedUsers.includes(username)) {
      bot.sendMessage(chatId, `Привіт ${userName}\nГоловне меню:`, adminMenu);
    } else {
      bot.sendMessage(chatId, `Привіт ${userName}\nГоловне меню:`, userMenu);
    }
  });

  // Обробка натискання кнопок
  bot.on("callback_query", (callbackQuery) => {
    const message = callbackQuery.message;
    const data = callbackQuery.data;
    const username = callbackQuery.from.username;

    if (data === "Налаштування") {
      if (allowedUsers.includes(username)) {
        bot.sendMessage(message.chat.id, settingsMenu.text, settingsMenu);
      } else {
        bot.sendMessage(
          message.chat.id,
          createBackMenu("Налаштування").text,
          createBackMenu("Налаштування")
        );
      }
    } else if (data === "Назад") {
      bot.sendMessage(message.chat.id, "Головне меню:", adminMenu);
    } else if (data === "Доступні проксі") {
      bot.sendMessage(
        message.chat.id,
        createBackMenu("Доступні проксі").text,
        createBackMenu("Доступні проксі")
      );
    } else if (data === "Останні транзакції") {
      bot.sendMessage(
        message.chat.id,
        createBackMenu("Останні транзакції").text,
        createBackMenu("Останні транзакції")
      );
    } else if (data === "Відкриті заявки") {
      bot.sendMessage(
        message.chat.id,
        createBackMenu("Відкриті заявки").text,
        createBackMenu("Відкриті заявки")
      );
    } else if (data === "Статус проксі") {
      bot.sendMessage(
        message.chat.id,
        createBackMenu("Статус проксі").text,
        createBackMenu("Статус проксі")
      );
    } else if (data === "Арендувати проксі") {
      bot.sendMessage(
        message.chat.id,
        createBackMenu("Арендувати проксі").text,
        createBackMenu("Арендувати проксі")
      );
    } else if (data === "Поповнити гаманець") {
      bot.sendMessage(
        message.chat.id,
        createBackMenu("Поповнити гаманець").text,
        createBackMenu("Поповнити гаманець")
      );
    } else if (data === "Мої проксі") {
      bot.sendMessage(
        message.chat.id,
        createBackMenu("Мої проксі").text,
        createBackMenu("Мої проксі")
      );
    } else if (data === "Мої транзакції") {
      bot.sendMessage(
        message.chat.id,
        createBackMenu("Мої транзакції").text,
        createBackMenu("Мої транзакції")
      );
    } else {
      bot.sendMessage(message.chat.id, `Ви нажали кнопку: ${data}`);
    }
  });
};

export default setupHandlers;
