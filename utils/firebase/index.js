// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from 'firebase/app';
import 'firebase/auth';

try {
  const firebaseConfig = {
    apiKey: 'AIzaSyCVj3N10nbc4MRTF9QP2CtlnaGik1SCF2o',
    authDomain: 'canvas-7aa3d.firebaseapp.com',
    databaseURL: 'https://canvas-7aa3d.firebaseio.com',
    projectId: 'canvas-7aa3d',
    storageBucket: 'canvas-7aa3d.appspot.com',
    messagingSenderId: '628805987868',
    appId: '1:628805987868:web:d4686d4240ddf905fbb9d9'
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
} catch {}

module.exports = firebase
