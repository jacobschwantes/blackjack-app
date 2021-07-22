import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
const config = {
    apiKey: "AIzaSyD_MPd_9_MeVL0w7gTlsZJRa_HVbridG7s",
    authDomain: "blackjack-demo.firebaseapp.com",
    databaseURL: "https://blackjack-demo-default-rtdb.firebaseio.com/"
};

firebase.initializeApp(config);

export const auth = firebase.auth;
export const db = firebase.database();
