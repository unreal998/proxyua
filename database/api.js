import { ref, onValue, set, update, remove} from "firebase/database";
import database from "./index.js";


export function getProxyList() {

}

export async function authorization(chatId) {
    const userData = ref(database, `users/${chatId}`);
    return new Promise(function(resolve, reject) {
        onValue(userData, (snapshot) => {
            const data = snapshot.val();
            resolve(data);
        }, {
            onlyOnce: true
        });
    })

}

export async function addNewUser(msg) {
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

export async function addNewProxyConfig(msg) {
    const proxyData = {
        address: msg.text || "",
        status: true,
        login: "",
        password: '',
        id: msg.chat.id
    }
    set(ref(database, `proxy/${msg.message_id}`), proxyData);
    Promise.resolve(proxyData);
}