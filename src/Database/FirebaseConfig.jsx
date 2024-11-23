import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBlYRsCisLW0OK43FP1do_OxfmZcMRr240",  
  authDomain: "aspa-fd117.firebaseapp.com",
  projectId: "aspa-fd117",
  storageBucket: "aspa-fd117.appspot.com",
  messagingSenderId: "834792416400",
  appId: "1:834792416400:web:2a23f1a26c43b05422e415",
  measurementId: "G-2YRJXXZH38" 
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
