import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCCW64Ty1mDKSAIHTxWdQmG7e0WHGqWtKM",
  authDomain: "shift-32f36.firebaseapp.com",
  databaseURL: "https://shift-32f36.firebaseio.com",
  projectId: "shift-32f36",
  storageBucket: "shift-32f36.appspot.com",
  messagingSenderId: "187473722258"
});

export const db = firebaseApp.database();
