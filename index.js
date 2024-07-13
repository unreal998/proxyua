import bot from "./bot.js";
import setupHandlers from "./handlers.js";
import { authorization, addNewUser } from "./database/api.js";
import { userMenu, adminMenu } from "./UI/menus.js";
import { menuDictionary } from "./UI/dictionary.js";

class ProxyUABot {
  bot;
  userData;
  selectedProxyByUser;

  constructor() {
    this.bot = bot;
    this.responseMessageAwaiting = {
      type: "",
      lastRequestMessage: "",
    };
    this.selectedProxyByUser = {
      id: "",
      chatId: "",
      photoURL: "",
      status: "processing",
      proxyAddress: "",
      rentTime: "",
      price: "",
      timeInMilliseconds: null,
      finishDate: null,
    }
  }

  start() {
    this.bot.onText(/\/start/, (msg) => {
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
    });
  }
}

const proxyBotInstance = new ProxyUABot();
proxyBotInstance.start();
