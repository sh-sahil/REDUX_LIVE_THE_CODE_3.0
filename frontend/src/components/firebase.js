// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  //Add your key
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);

const firebaseConfigChat = {
    //Add your key

};

// Initialize Firebase for chat history

const app2 = initializeApp(firebaseConfig);
const firestore = getFirestore(app2);

export { app, firestore };
