import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAUtRjB2-5m6GVcw12jk-hctMfmVkZcp_U",
    authDomain: "tg-crwn-db.firebaseapp.com",
    databaseURL: "https://tg-crwn-db.firebaseio.com",
    projectId: "tg-crwn-db",
    storageBucket: "tg-crwn-db.appspot.com",
    messagingSenderId: "297701229826",
    appId: "1:297701229826:web:a8752229fdb478dd86ee1b",
    measurementId: "G-3SG4RSCYN9"
};

export const createUserProfileDocument = async (userAuth, additionals={}) => {
    if(userAuth){
        const userRef = firestore.doc(`users/${userAuth.uid}`);
        const snapShot = await userRef.get();
        if (!snapShot.exists){
            //create user
            const { displayName, email } = userAuth;
            const createdAt = new Date();

            try{
                await userRef.set({
                    displayName,
                    email,
                    createdAt,
                    ...additionals
                })
            } catch (error) {
                console.log('error creating user', error.message);
            }
        }
        return userRef;
    }
    return;
}
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt:'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebaseConfig;