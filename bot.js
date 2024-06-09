import TelegramBot from "node-telegram-bot-api";
import { TOKEN } from "./constants.js";

const bot = new TelegramBot(TOKEN, { polling: true });

export default bot;
