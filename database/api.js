import { ref, onValue, set, update } from "firebase/database";
import { settingsMenuDictionary } from "../UI/dictionary.js";
import database from "./index.js";

export async function authorization(chatId) {
  const userData = ref(database, `users/${chatId}`);
  return new Promise(function (resolve, reject) {
    onValue(
      userData,
      (snapshot) => {
        const data = snapshot.val();
        resolve(data);
      },
      {
        onlyOnce: true,
      }
    );
  });
}

export async function addNewUser(msg) {
  const userData = {
    firstName: msg.from.first_name || "",
    lastName: msg.from.last_name || "",
    userName: msg.from.username || "",
    type: "user",
    id: msg.chat.id,
  };
  set(ref(database, `users/${msg.chat.id}`), userData);
  Promise.resolve(userData);
}

export async function getUserData(chatId) {
  const userData = ref(database, `users/${chatId}`);
  return new Promise(function (resolve, reject) {
    onValue(
      userData,
      (snapshot) => {
        const data = snapshot.val();
        resolve(data);
      },
      {
        onlyOnce: true,
      }
    );
  });
}

export async function updateUserData(userName) {
  return new Promise(function (resolve, reject) {
    const userDataList = ref(database, `users`);
    onValue(
      userDataList,
      (snapshot) => {
        const data = snapshot.val();
        for (const key in data) {
          if (data[key].userName === userName) {
            update(ref(database, `users/${data[key].id}`), {
              type: "admin",
            });
            resolve(data[key]);
          }
        }
        reject("not find");
      },
      {
        onlyOnce: true,
      }
    );
  });
}

export async function updateWalletDataData(message, type) {
  return new Promise(
    function (resolve, reject) {
      update(
        ref(
          database,
          `wallet/${
            type === settingsMenuDictionary.TRUST_SETTINGS
              ? "Trust"
              : "Monobank"
          }`
        ),
        {
          value: message,
        }
      );
      resolve(data[key]);
    },
    {
      onlyOnce: true,
    }
  );
}

export async function addNewTransaction(transactionData) {
  return new Promise(function (resolve, reject) {
    set(ref(database, `transactions/${transactionData.id}`), transactionData);
    resolve(transactionData);
  });
}

export async function fetchAdmins() {
  return new Promise(function (resolve, reject) {
    const userDataList = ref(database, `users`);
    onValue(
      userDataList,
      (snapshot) => {
        const data = snapshot.val();
        const adminsArray = [];
        for (const key in data) {
          if (data[key].type === "admin") {
            adminsArray.push(data[key]);
          }
        }
        resolve(adminsArray);
      },
      {
        onlyOnce: true,
      }
    );
  });
}

export async function getUsers() {
  return new Promise(function (resolve, reject) {
    const userDataList = ref(database, `users`);
    onValue(
      userDataList,
      (snapshot) => {
        const data = snapshot.val();
        const adminsArray = [];
        for (const key in data) {
          if (data[key].type === "admin") {
          }
        }
        resolve(adminsArray);
      },
      {
        onlyOnce: true,
      }
    );
  });
}

export async function getUser(id) {
  return new Promise(function (resolve, reject) {
    set(ref(database, `transactions/${id}`), transactionData);
    resolve(transactionData);
  });
}

export async function getTransactionData(transactionId) {
  const proxyDataList = ref(database, `transactions/${transactionId}`);
  return new Promise(function (resolve, reject) {
    onValue(
      proxyDataList,
      (snapshot) => {
        const data = snapshot.val();
        resolve(data);
      },
      {
        onlyOnce: true,
      }
    );
  });
}

export async function getTransactionList() {
  const proxyDataList = ref(database, `transactions`);
  return new Promise(function (resolve, reject) {
    onValue(
      proxyDataList,
      (snapshot) => {
        const data = snapshot.val();
        resolve(data);
      },
      {
        onlyOnce: true,
      }
    );
  });
}

export async function addNewProxyConfig(msg) {
  const proxyData = {
    address: msg.text || "",
    status: true,
    login: "",
    password: "",
  };
  return new Promise(function (resolve, reject) {
    set(ref(database, `proxy/${msg.message_id}`), proxyData).then((data) => {
      resolve(proxyData);
    });
  });
}

export async function getProxyList() {
  const proxyDataList = ref(database, `proxy/`);
  return new Promise(function (resolve, reject) {
    onValue(
      proxyDataList,
      (snapshot) => {
        const data = snapshot.val();
        resolve(data);
      },
      {
        onlyOnce: true,
      }
    );
  });
}

export async function getProxyData(id) {
  const proxyDataList = ref(database, `proxy/${id}`);
  return new Promise(function (resolve, reject) {
    onValue(
      proxyDataList,
      (snapshot) => {
        const data = snapshot.val();
        resolve(data);
      },
      {
        onlyOnce: true,
      }
    );
  });
}

export async function updateProxyData(proxyData, id) {
  return new Promise(function (resolve, reject) {
    update(ref(database, `proxy/${id}`), {
      ...proxyData,
    });
    const proxyDataList = ref(database, `proxy/${id}`);
    onValue(
      proxyDataList,
      (snapshot) => {
        const data = snapshot.val();
        resolve(data);
      },
      {
        onlyOnce: true,
      }
    );
  });
}

export async function updateProxyByAddressData(proxyData, address) {
  return new Promise(function (resolve, reject) {
    const proxyDataListRef = ref(database, `proxy`);
    onValue(
      proxyDataListRef,
      (snapshot) => {
        const data = snapshot.val();
        let searchedProxy;
        for (const key in data) {
          const proxyElement = data[key];
          if (proxyElement.address === address) {
            searchedProxy = key;
          }
        }

        if (searchedProxy) {
          update(ref(database, `proxy/${searchedProxy}`), {
            ...proxyData,
          });
          const proxyDataList = ref(database, `proxy/${searchedProxy}`);
          onValue(
            proxyDataList,
            (snapshot) => {
              const data = snapshot.val();
              resolve(data);
            },
            {
              onlyOnce: true,
            }
          );
        } else {
          reject("proxy not found");
        }
      },
      {
        onlyOnce: true,
      }
    );
  });
}

export async function getActiveTransactionList() {
  const transactionsDataRef = ref(database, `transactions`);
  return new Promise(function (resolve, reject) {
    onValue(
      transactionsDataRef,
      (snapshot) => {
        const data = snapshot.val();
        const openTransactionsList = [];
        for (const key in data) {
          const element = data[key];
          element.id = key;
          element.status === "processing" && openTransactionsList.push(element);
        }
        resolve(openTransactionsList);
      },
      {
        onlyOnce: true,
      }
    );
  });
}

export async function approveTransaction(id) {
  return new Promise(function (resolve, reject) {
    update(ref(database, `transactions/${id}`), {
      status: "approved",
    });
    const proxyDataList = ref(database, `transactions/${id}`);
    onValue(
      proxyDataList,
      (snapshot) => {
        const data = snapshot.val();
        resolve(data);
      },
      {
        onlyOnce: true,
      }
    );
  });
}

export async function declineTransaction(id) {
  return new Promise(function (resolve, reject) {
    update(ref(database, `transactions/${id}`), {
      status: "decline",
    });
    const proxyDataList = ref(database, `transactions/${id}`);
    onValue(
      proxyDataList,
      (snapshot) => {
        const data = snapshot.val();
        resolve(data);
      },
      {
        onlyOnce: true,
      }
    );
  });
}
