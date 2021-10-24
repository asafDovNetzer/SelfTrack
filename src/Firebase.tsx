import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// import { setPersistence, browserSessionPersistence } from "firebase/auth";

const config = {
  apiKey: "AIzaSyCkfEb7hWwjUsl_2sevK0Ei4H6Pl06w6jE",
  authDomain: "self-track-44917.firebaseapp.com",
  databaseURL: "https://self-track-44917-default-rtdb.firebaseio.com",
  projectId: "self-track-44917",
  storageBucket: "self-track-44917.appspot.com",
  messagingSenderId: "967880243135",
  appId: "1:967880243135:web:7c45542716be3d45a9930a",
  measurementId: "G-LN5V5DPKRF",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
// const app = initializeApp(config);
// const analytics = getAnalytics(app);

export const db = firebase.firestore();
