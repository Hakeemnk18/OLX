
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAn_-P614PhoKnC2o7xRXyXpkf7f6S1J9s",
  authDomain: "olx-clone-cbb70.firebaseapp.com",
  projectId: "olx-clone-cbb70",
  storageBucket: "olx-clone-cbb70.firebasestorage.app",
  messagingSenderId: "556947337419",
  appId: "1:556947337419:web:d724ad128ec06404ac2b4e"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
