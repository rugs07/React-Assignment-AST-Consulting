import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCsQg0fqJYUTKDyQwME9qR77gsh6eYZO8I",
  authDomain: "hospital-assignment-414209.firebaseapp.com",
  projectId: "hospital-assignment-414209",
  storageBucket: "hospital-assignment-414209.appspot.com",
  messagingSenderId: "204320152383",
  appId: "1:204320152383:web:c26a783d0eb42273aa518a",
  measurementId: "G-JHTPY9E1SC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export {auth,provider};