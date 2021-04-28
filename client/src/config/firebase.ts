import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBkCvf99mbHD3_sr9GUEVjdgkJzLh5dexA",
  authDomain: "pallotyni-8bd40.firebaseapp.com",
  projectId: "pallotyni-8bd40",
  storageBucket: "pallotyni-8bd40.appspot.com",
  messagingSenderId: "111227330434",
  appId: "1:111227330434:web:ce0017ea87ee671721399b",
  measurementId: "G-HGTVTK85TB",
};

firebase.initializeApp(firebaseConfig);

firebase.firestore().settings({
  ignoreUndefinedProperties: true,
});

export default firebase;
