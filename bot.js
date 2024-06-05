const TelegramBot = require("node-telegram-bot-api");
const { TOKEN } = require("./constants");

const bot = new TelegramBot(TOKEN, { polling: true });

module.exports = bot;
