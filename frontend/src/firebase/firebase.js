// src/firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCiDnsrGBmsfO2gU1x6SffKx-prB1mW-xY",
  authDomain: "money-mosaic.firebaseapp.com",
  projectId: "money-mosaic",
  storageBucket: "money-mosaic.appspot.com",
  messagingSenderId: "1096017666814",
  appId: "1:1096017666814:web:4ac277b01121027b137baf",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };
