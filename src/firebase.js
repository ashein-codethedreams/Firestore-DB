// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCFSTk_f7KP-DrHkUk1F7nRx7t0WwgxY10",
  authDomain: "expense-app-562ec.firebaseapp.com",
  databaseURL: "https://expense-app-562ec-default-rtdb.firebaseio.com",
  projectId: "expense-app-562ec",
  storageBucket: "expense-app-562ec.appspot.com",
  messagingSenderId: "14101314015",
  appId: "1:14101314015:web:166306af3a27c3cbe22c6a",
  measurementId: "G-DKM1MXW9HV",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };
