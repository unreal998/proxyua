const bot = require("./bot");
const setupHandlers = require("./handlers");

setupHandlers(bot);

console.log("Бот запущено");
