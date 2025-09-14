import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCqOOmy5ujlk5qlQwPAs4Fp2QPtTzTJo40",
  authDomain: "online-shopping-3a61d.firebaseapp.com",
  projectId: "online-shopping-3a61d",
  storageBucket: "online-shopping-3a61d.firebasestorage.app",
  messagingSenderId: "916990560701",
  appId: "1:916990560701:web:a4ecd7a67e9ca7db1f2ad4",
  measurementId: "G-H1F17YDYMF"
};

const app = initializeApp(firebaseConfig);

let auth = getAuth(app)
let db = getFirestore(app)

export { auth, db }