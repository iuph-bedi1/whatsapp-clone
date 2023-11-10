import '../styles/globals.css';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth,db} from "../firebase";
import Logini from './api/login';
import Loading from '../components/loading';
import { useEffect } from 'react';
import firebase from 'firebase/compat/app';


function MyApp({ Component, pageProps }) {
 const [user ,loading] = useAuthState(auth);

 useEffect(()=>{
  
  if(user) {
    db.collection('users').doc(user.uid).set({
       email:user.email,
       lastseen:firebase.firestore.FieldValue.serverTimestamp(),
       photoURL:user.photoURL,
    },
    {merge:true}
    );
  }
 },[user]);

 if(loading) return <Loading />;
if(!user) return <Logini/>;
 
  return <Component {...pageProps} />
}

export default MyApp;
