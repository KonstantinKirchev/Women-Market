import {AuthMethods, AuthProviders} from "../../node_modules/angularfire2";

export const firebaseConfig = {
    apiKey: "AIzaSyDkCO0POjAZVRGmQ7mIa_YykDUNqSIgiDw",
    authDomain: "womens-market.firebaseapp.com",
    databaseURL: "https://womens-market.firebaseio.com",
    storageBucket: "womens-market.appspot.com",
    messagingSenderId: "782254951232"
};



export const authConfig = {
    provider: AuthProviders.Password,
    method: AuthMethods.Password
};