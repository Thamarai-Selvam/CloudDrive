import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    databaseURL : process.env.REACT_APP_FIREBASE_DATABASEURL,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDERID,
    appId: process.env.REACT_APP_FIREBASE_APPID
}


const app = firebase.initializeApp(firebaseConfig)
const firestore = app.firestore()
const dbConfig = {
    folders: firestore.collection("folders"),
    files: firestore.collection("files"),
    formatDoc: doc => {
        return { id: doc.id, ...doc.data() }
    },
    getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp, 
} 
export const auth = app.auth() 
export const storage = app.storage()
export const database = dbConfig 
export default app




// const app = firebase.initializeApp({
//     apiKey: process.env.RA_FIREBASE_API_KEY,
//     authDomain: process.env.RA_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.RA_FIREBASE_PROJECTID,
//     storageBucket: process.env.RA_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.RA_FIREBASE_MESSAGE_SENDERID,
//     appId: process.env.RA_FIREBASE_APPID
// })

// export const auth = app.auth()
// export default app

// var firebaseConfig = {
//     apiKey: "AIzaSyD2kRenfJCUE22ZHg8ENz-5o_nQ4zACE28",
//     authDomain: "cloud-drive-dev.firebaseapp.com",
//     projectId: "cloud-drive-dev",
//     storageBucket: "cloud-drive-dev.appspot.com",
//     messagingSenderId: "323834285527",
//     appId: "1:323834285527:web:d7defdbf15608fccad0f92"
//   };
//   // Initialize Firebase
//   const app = firebase.initializeApp(firebaseConfig);

// export const auth = app.auth()
// export default app