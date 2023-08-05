import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAL8b7Ndc4MbUgQ7dEozLntfvB5Gh7-1io",
  authDomain: "vuex-speakvue.firebaseapp.com",
  projectId: "vuex-speakvue",
  storageBucket: "vuex-speakvue.appspot.com",
  messagingSenderId: "863949111570",
  appId: "1:863949111570:web:07d351bf9244d438cff3cb",
};

// initialize firebase app
initializeApp(firebaseConfig);

// initialize firebase auth
const auth = getAuth();

export { auth };
