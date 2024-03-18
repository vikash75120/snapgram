import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
   apiKey: "AIzaSyBsBj6XZaXLmI14kohFDmO670DIcqOLf0w",
   authDomain: "snapgram-d5a8f.firebaseapp.com",
   projectId: "snapgram-d5a8f",
   storageBucket: "snapgram-d5a8f.appspot.com",
   messagingSenderId: "941759905379",
   appId: "1:941759905379:web:2c702b799154ba6e8f0256",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app, "gs://snapgram-d5a8f.appspot.com");

export { auth,db,storage };