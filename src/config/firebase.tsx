import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAs1SuCEyzxSA2_aAW4I0dRuU5GJ5FSAWA",
  authDomain: "weather-aa47e.firebaseapp.com",
  projectId: "weather-aa47e",
  storageBucket: "weather-aa47e.appspot.com",
  messagingSenderId: "164570145273",
  appId: "1:164570145273:web:a5306a665e728941335d28"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)