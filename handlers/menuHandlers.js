import { adminMenu, createBackMenu, userMenu } from "../UI/menus.js";
import { settingsMenu } from "../UI/settings.js";

export default function menuHandlers(cbData, bot, message, userData) {
    if (cbData.button === "Налаштування") {
        if (userData.type === 'admin') {
          bot.sendMessage(message.chat.id, settingsMenu.text, settingsMenu);
        } else {
          bot.sendMessage(
            message.chat.id,
            createBackMenu("Налаштування").text,
            createBackMenu("Налаштування")
          );
        }
      } else if (cbData.button === "Назад") {
        if (userData.type === "admin") {
            bot.sendMessage(message.chat.id, "Головне меню:", adminMenu);
        } else {
            bot.sendMessage(message.chat.id, "Головне меню:", userMenu);
        }
      } else if (cbData.button === "Список проксі") {
        
      } else if (cbData.button === "Останні транзакції") {
        bot.sendMessage(
          message.chat.id,
          createBackMenu("Останні транзакції").text,
          createBackMenu("Останні транзакції")
        );
      } else if (cbData.button === "Відкриті заявки") {
        bot.sendMessage(
          message.chat.id,
          createBackMenu("Відкриті заявки").text,
          createBackMenu("Відкриті заявки")
        );
      } else if (cbData.button === "Арендувати проксі") {
        bot.sendMessage(
          message.chat.id,
          createBackMenu("Арендувати проксі").text,
          createBackMenu("Арендувати проксі")
        );
      } else if (cbData.button === "Поповнити гаманець") {
        bot.sendMessage(
          message.chat.id,
          createBackMenu("Поповнити гаманець").text,
          createBackMenu("Поповнити гаманець")
        );
      } else if (cbData.button === "Мої проксі") {
        bot.sendMessage(
          message.chat.id,
          createBackMenu("Мої проксі").text,
          createBackMenu("Мої проксі")
        );
      } else if (cbData.button === "Мої транзакції") {
        bot.sendMessage(
          message.chat.id,
          createBackMenu("Мої транзакції").text,
          createBackMenu("Мої транзакції")
        );
      } else {
        bot.sendMessage(message.chat.id, `Ви нажали кнопку: ${cbData.button}`);
      }
}