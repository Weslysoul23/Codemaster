import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyC7BV5U9NYPebC82pkHkN6JdNOnSQDPgqw",
  authDomain: "code-glitch-3d.firebaseapp.com",
  databaseURL: "https://code-glitch-3d-default-rtdb.firebaseio.com",
  projectId: "code-glitch-3d",
  storageBucket: "code-glitch-3d.firebasestorage.app",
  messagingSenderId: "252040811390",
  appId: "1:252040811390:web:5e85c04b29950a5351192f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
