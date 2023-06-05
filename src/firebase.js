import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Configura la conexión con Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA0ydDdOexWUYRXQgZrwRWWe6S9yPGXHXA",
  authDomain: "quiz-cybersecurity.firebaseapp.com",
  projectId: "quiz-cybersecurity",
  storageBucket: "quiz-cybersecurity.appspot.com",
  messagingSenderId: "473257856137",
  appId: "1:473257856137:web:1e0efe252a5bf1c7314a58"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore, collection, addDoc };
