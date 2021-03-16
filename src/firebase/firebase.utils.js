import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCy575NCOGeWyo8JeaDzGe4a_2q27aeayE",
    authDomain: "clothing-store-97ff4.firebaseapp.com",
    projectId: "clothing-store-97ff4",
    storageBucket: "clothing-store-97ff4.appspot.com",
    messagingSenderId: "154408160162",
    appId: "1:154408160162:web:ca0f8ca813a3fe25ebc0fb",
    measurementId: "G-F3KSYNW44V"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ promt: 'select account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;