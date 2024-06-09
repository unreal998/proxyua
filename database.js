import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyArlR6NXzbbJXZQLWstzCsmKnSgqJ2MWMA",
  authDomain: "proxyua-51f21.firebaseapp.com",
  projectId: "proxyua-51f21",
  storageBucket: "proxyua-51f21.appspot.com",
  messagingSenderId: "656315602096",
  appId: "1:656315602096:web:27d2ae9f4fdfc075821775"
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);
export default database;