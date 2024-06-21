import menuHandlers from './handlers/menuHandlers.js'

const setupHandlers = (bot, userData) => {
  // Обробка натискання кнопок
  bot.on("callback_query", (callbackQuery) => {
    const message = callbackQuery.message;
    const cbData = callbackQuery.data;
    const parsedData = JSON.parse(cbData);
    switch(parsedData.type) {
      case 'menu':
        menuHandlers(parsedData, bot, message, userData)
        break;
      default:
        bot.sendMessage(message.chat.id, 'callback type is missing');
    }
    
    
  });
};

export default setupHandlers;
