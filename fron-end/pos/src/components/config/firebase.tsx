import firebase from "firebase/compat/app";
import { getStorage } from "firebase/storage";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBWYrd3dM10x20oqXzpRmW3beZRZHFvdCk",
    authDomain: "react-pos-13e6f.firebaseapp.com",
    projectId: "react-pos-13e6f",
    storageBucket: "react-pos-13e6f.appspot.com",
    messagingSenderId: "596869146422",
    appId: "1:596869146422:web:58ca94d7b46626400e7597",
    measurementId: "G-QKLFDDS7K1"
  };

  const app = firebase.initializeApp(firebaseConfig);
  export const storage = getStorage(app);