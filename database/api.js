import { ref, onValue, set, update, remove} from "firebase/database";
import database from "./index.js";

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

export async function addNewTransaction(transactionData) {
    set(ref(database, `transactions/${transactionData.id}`), transactionData);
    Promise.resolve(transactionData);
}

export async function getTransactionData(transactionId) {
    const proxyDataList = ref(database, `transactions/${transactionId}`);
    return new Promise(function(resolve, reject) {
        onValue(proxyDataList, (snapshot) => {
            const data = snapshot.val();
            resolve(data);
        }, {
            onlyOnce: true
        });
    })
}

export async function getTransactionList() {
    const proxyDataList = ref(database, `transactions`);
    return new Promise(function(resolve, reject) {
        onValue(proxyDataList, (snapshot) => {
            const data = snapshot.val();
            resolve(data);
        }, {
            onlyOnce: true
        });
    })
}

export async function addNewProxyConfig(msg) {
    const proxyData = {
        address: msg.text || "",
        status: true,
        login: "",
        password: '',
    }
    return new Promise(function(resolve, reject) {
        set(ref(database, `proxy/${msg.message_id}`), proxyData).then((data) => {
            resolve(proxyData);
        });
    })

    
}

export async function getProxyList() {
    const proxyDataList = ref(database, `proxy/`);
    return new Promise(function(resolve, reject) {
        onValue(proxyDataList, (snapshot) => {
            const data = snapshot.val();
            resolve(data);
        }, {
            onlyOnce: true
        });
    })

}