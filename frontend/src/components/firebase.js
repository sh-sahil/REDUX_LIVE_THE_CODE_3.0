// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyDiPh8b83sZE7LWNRbaifSXbK1PPRrCz_k",
  authDomain: "fir-c5f6b.firebaseapp.com",
  projectId: "fir-c5f6b",
  storageBucket: "fir-c5f6b.appspot.com",
  messagingSenderId: "3088781313",
  appId: "1:3088781313:web:2fd3dd652d048db04ab000",
  measurementId: "G-68BJ0VMCV8",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);

const firebaseConfigChat = {
  apiKey: "AIzaSyCiDnsrGBmsfO2gU1x6SffKx-prB1mW-xY",
  authDomain: "money-mosaic.firebaseapp.com",
  projectId: "money-mosaic",
  storageBucket: "money-mosaic.appspot.com",
  messagingSenderId: "1096017666814",
  appId: "1:1096017666814:web:4ac277b01121027b137baf",
};

// Initialize Firebase for chat history

const app2 = initializeApp(firebaseConfig);
const firestore = getFirestore(app2);

export { app, firestore };
