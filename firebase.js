
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
 
const firebaseConfig = {
    apiKey: "AIzaSyA_DC2_J-F3bNDnjZ72jid2G7OWd91Mj0E",
    authDomain: "whatsappib-4f54b.firebaseapp.com",
    projectId: "whatsappib-4f54b",
    storageBucket: "whatsappib-4f54b.appspot.com",
    messagingSenderId: "23599896251",
    appId: "1:23599896251:web:d7402585a16cfc4654fb9e"
  };

  const app = !firebase.apps.length 
  ? firebase.initializeApp(firebaseConfig)
   : firebase.app();

  const db = app.firestore();
  const auth = app.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {db,auth,provider}