import TelegramBot from "node-telegram-bot-api";
import { TOKEN } from "./constants.js";
import setupHandlers from "./handlers.js";
import { authorization, addNewUser } from "./database/api.js";
import { userMenu, adminMenu } from "./UI/menus.js";
import { menuDictionary } from "./UI/dictionary.js";
import { selectedProxyByUserMock, responseMessageAwaitingMock } from './mocks.js';

class ProxyUABot {
  bot;
  userData;
  selectedProxyByUser;
  responseMessageAwaiting;
  selectedProxyByUser;


  constructor() {
    this.bot = new TelegramBot(TOKEN, { polling: true });
    this.commandList = [
      { command: '/start', description: 'start bot' }
    ];
    this.responseMessageAwaiting = {...responseMessageAwaitingMock};
    this.selectedProxyByUser = {...selectedProxyByUserMock};
    this.startWork = this.startWork.bind(this);
    this.clean = this.clean.bind(this);
  }

  start() {
    this.clean();
    this.bot.setMyCommands(this.commandList);
    this.bot.onText(/\/start/, (msg) => {
      this.startWork(msg);
    });
  }

  startWork(msg) {
    const chatId = msg.chat.id;
    const userFirstName = msg.from.first_name;
    authorization(chatId).then((data) => {
      if (data) {
        this.userData = data;
        if (data.type === "admin") {
          this.bot.sendMessage(
            chatId,
            `Привіт ${userFirstName}\n${menuDictionary.MAIN_MENU}`,
            adminMenu
          );
        } else {
          this.selectedProxyByUser.chatId = chatId;
          this.bot.sendMessage(
            chatId,
            `Привіт ${userFirstName}\n${menuDictionary.MAIN_MENU}`,
            userMenu
          );
        }
      } else {
        addNewUser(msg).then((data) => {
          this.userData = data;
          this.bot.sendMessage(
            chatId,
            `Привіт ${userFirstName}\n${menuDictionary.MAIN_MENU}`,
            userMenu
          );
        });
      }
      setupHandlers(
        this.bot,
        this.userData,
        this.responseMessageAwaiting,
        this.selectedProxyByUser
      );
    });
  }
  
  clean() {
    this.responseMessageAwaiting = {...responseMessageAwaitingMock};
    this.selectedProxyByUser = {...selectedProxyByUserMock};
    this.bot.removeAllListeners();
  }
}

const proxyBotInstance = new ProxyUABot();
proxyBotInstance.start();
