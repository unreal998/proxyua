import { ref, onValue, set, update, remove} from "firebase/database";
import bot from "./bot.js";
import setupHandlers from "./handlers.js";
import database from "./database.js";
import { userMenu, adminMenu } from './menus.js';

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
        
            this.authorization(chatId).then(data => {
                if (data) {
                    this.userData = data;
                    if (data.type === 'admin') {
                        this.bot.sendMessage(chatId, `Привіт ${userFirstName}\nГоловне меню:`, adminMenu);
                      } else {
                        this.bot.sendMessage(chatId, `Привіт ${userFirstName}\nГоловне меню:`, userMenu);
                      }
                } else {
                    this.addNewUser(msg).then(data => {
                        this.userData = data;
                        this.bot.sendMessage(chatId, `Привіт ${userFirstName}\nГоловне меню:`, userMenu);
                    })
                }
                setupHandlers(this.bot, this.userData);
            })
        }); 
    }

    async authorization(chatId) {
        const userData = ref(database, `users/${chatId}`);
        onValue(userData, (snapshot) => {
            const data = snapshot.val();
            Promise.resolve(data);
        }, {
            onlyOnce: true
        });
    }

    async addNewUser(msg) {
        const userData = {
            firstName: msg.from.first_name || "",
            lastName: msg.from.last_name || "",
            userName: msg.from.username || "",
            type: 'user',
            id: msg.chat.id
        }
        set(ref(database, `users/${msg.chat.id}`), userData);
        Promise.resolve(userData);
    }

}

const proxyBotInstance = new ProxyUABot();
proxyBotInstance.start();
