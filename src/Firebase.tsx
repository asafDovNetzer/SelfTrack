import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
// import { setPersistence, browserSessionPersistence } from "firebase/auth";

const config = {
  apiKey: "AIzaSyCkfEb7hWwjUsl_2sevK0Ei4H6Pl06w6jE",
  authDomain: "self-track-44917.firebaseapp.com",
  databaseURL: "https://self-track-44917-default-rtdb.firebaseio.com",
  projectId: "self-track-44917",
  storageBucket: "self-track-44917.appspot.com",
  //   messagingSenderId: "988020024317",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
// setPersistence(auth, browserSessionPersistence)
//   .then()
//   .catch((err) => console.log(err));

export const db = firebase.firestore();
