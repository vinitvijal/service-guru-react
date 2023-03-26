// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgNtUOwxpwU2cWKaxHIueaYJnhuDXuHw0",
  authDomain: "service-seva.firebaseapp.com",
  databaseURL: "https://service-seva-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "service-seva",
  storageBucket: "service-seva.appspot.com",
  messagingSenderId: "632340108895",
  appId: "1:632340108895:web:588112e7189ea6fb206dea",
  measurementId: "G-FKCL9FS383"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log(analytics)

const database = getDatabase(app);


export default database;