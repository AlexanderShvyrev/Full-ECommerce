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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get()

    //if no document found it's getting created in firestore
    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName, email, createdAt, ...additionalData
            })
        } catch (error) {
            console.log('Error creating user', error.message);
        }
    }
    return userRef;
}
//initializes our app by checking and making sure it has not been initialized already
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}


export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ promt: 'select account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;