import firebase from 'firebase';
import credentials from './credentials'

const firebaseApp = firebase.initializeApp({
  apiKey: credentials.apiKey,
  authDomain: credentials.authDomain,
  databaseURL: credentials.databaseURL,
  projectId: credentials.projectId,
  storageBucket: credentials.storageBucket,
  messagingSenderId: credentials.messagingSenderId
});

export const db = firebaseApp.database();
