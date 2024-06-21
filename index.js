import bot from "./bot.js";
import setupHandlers from "./handlers.js";
import menuHandlers from "./handlers/menuHandlers.js";

import { userMenu, adminMenu } from './UI/menus.js';

class ProxyUABot {
    bot;
    userData;

    constructor() {
        this.bot = bot;
    }

    start() {
        this.bot.onText(/\/start/, (msg) => {
            const chatId = msg.chat.id;
            const userFirstName = msg.from.first_name;
            
            authorization(chatId).then(data => {
                if (data) {
                    this.userData = data;
                    if (data.type === 'admin') {
                        this.bot.sendMessage(chatId, `Привіт ${userFirstName}\nГоловне меню:`, adminMenu);
                      } else {
                        this.bot.sendMessage(chatId, `Привіт ${userFirstName}\nГоловне меню:`, userMenu);
                      }
                } else {
                    addNewUser(msg).then(data => {
                        this.userData = data;
                        this.bot.sendMessage(chatId, `Привіт ${userFirstName}\nГоловне меню:`, userMenu);
                    })
                }
                setupHandlers(this.bot, this.userData);
            })
        }); 
    }

}

const proxyBotInstance = new ProxyUABot();
proxyBotInstance.start();
