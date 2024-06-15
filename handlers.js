import { adminMenu, settingsMenu, createBackMenu } from "./menus.js";

const setupHandlers = (bot, userData) => {
  // Обробка натискання кнопок
  bot.on("callback_query", (callbackQuery) => {
    const message = callbackQuery.message;
    const data = callbackQuery.data;

    if (data === "Налаштування") {
      if (userData.type === 'admin') {
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
