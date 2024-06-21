import bot from "./bot.js";
import setupHandlers from "./handlers.js";
import { authorization } from './database/api.js';
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
            console.log("===start==")
            authorization(chatId).then(data => {
                if (data) {
                    this.userData = data;
                    if (data.type === 'admin') {
                        console.log("===data.type==", data.type)
                        this.bot.sendMessage(chatId, `Привіт ${userFirstName}\nГоловне меню:`, adminMenu);
                      } else {
                        console.log("===data.type=Привіт=")
                        this.bot.sendMessage(chatId, `Привіт ${userFirstName}\nГоловне меню:`, userMenu);
                      }
                } else {
                    addNewUser(msg).then(data => {
                        this.userData = data;
                        console.log("===data.type=Привіт=", this.userData)
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
