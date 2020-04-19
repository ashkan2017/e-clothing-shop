import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDqhZtDhrRrw0QhGMMF9wdboN9SphTG4Ug",
  authDomain: "crwn-db-e1dcd.firebaseapp.com",
  databaseURL: "https://crwn-db-e1dcd.firebaseio.com",
  projectId: "crwn-db-e1dcd",
  storageBucket: "crwn-db-e1dcd.appspot.com",
  messagingSenderId: "72633380637",
  appId: "1:72633380637:web:afded63890d8a6a649fbf4"
  //measurementId: "G-4T0JTKRG2W"
  };

export const createUserProfileDocument = async (userAuth, additinalData) => {

  if(!userAuth) return;
   const userRef = firestore.doc(`users/${userAuth.uid}`);
   const snapShot  = await userRef.get();
  
  if(!snapShot.exists){
   const {displayName,email} = userAuth;
   const createdAt = new Date();


   try{
   await userRef.set({
     displayName,
     email,
     createdAt,
     ...additinalData
   })
   } catch(error){

    console.log('error creating user', error.message);
   }
  }
  return userRef;
};


  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
 
  provider.setCustomParameters({prompt:'select_account'});
  export const signInwithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;

  