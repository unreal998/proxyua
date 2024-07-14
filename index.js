import TelegramBot from "node-telegram-bot-api";
import { TOKEN } from "./constants.js";
import setupHandlers from "./handlers.js";
import { authorization, addNewUser } from "./database/api.js";
import { userMenu, adminMenu } from "./UI/menus.js";
import { menuDictionary } from "./UI/dictionary.js";
import {
  selectedProxyByUserMock,
  responseMessageAwaitingMock,
} from "./mocks.js";

class ProxyUABot {
  constructor() {
    this.bot = new TelegramBot(TOKEN, { polling: true });
    this.commandList = [{ command: "/start", description: "start bot" }];
    this.responseMessageAwaiting = { ...responseMessageAwaitingMock };
    this.selectedProxyByUser = { ...selectedProxyByUserMock };
    this.startWork = this.startWork.bind(this);
    this.clean = this.clean.bind(this);
    this.setupHandlers = setupHandlers.bind(this);
  }

  start() {
    this.bot.setMyCommands(this.commandList);
    this.bot.onText(/\/start/, (msg) => {
      this.clean();
      this.startWork(msg);
    });
  }

  startWork(msg) {
    const chatId = msg.chat.id;
    const userFirstName = msg.from.first_name;
    authorization(chatId).then((data) => {
      if (data) {
        this.userData = data;
        const menu = data.type === "admin" ? adminMenu : userMenu;
        this.bot.sendMessage(
          chatId,
          `👋 Привіт ${userFirstName}\n${menuDictionary.MAIN_MENU}`,
          menu
        );
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
      this.setupHandlers(
        this.bot,
        this.userData,
        this.responseMessageAwaiting,
        this.selectedProxyByUser
      );
    });
  }

  clean() {
    this.responseMessageAwaiting = { ...responseMessageAwaitingMock };
    this.selectedProxyByUser = { ...selectedProxyByUserMock };
    this.userData = {};
    this.bot.removeAllListeners();
    this.bot.off();
  }
}

const proxyBotInstance = new ProxyUABot();
proxyBotInstance.start();
