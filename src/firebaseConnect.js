import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

let firebaseConfig = {
    apiKey: "AIzaSyCC1uy9H4PPMQNZt7X_PCHxnyuLR-8vPKE",
    authDomain: "meuapp-68176.firebaseapp.com",
    databaseURL: "https://meuapp-68176-default-rtdb.firebaseio.com",
    projectId: "meuapp-68176",
    storageBucket: "meuapp-68176.appspot.com",
    messagingSenderId: "281641167514",
    appId: "1:281641167514:web:7dc209b71e2b85be0f4d23",
    measurementId: "G-EQ04X6FPWK"
  };
  
  // Initialize Firebase
  
  if(!firebase.apps.length) {
    //abrir a conexão
    firebase.initializeApp(firebaseConfig);
  }

  export default firebase