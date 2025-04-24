import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDgxWXezkhfMAL_fIsq9xAGOfbHiJnK86Y",
  authDomain: "nexu-calculator.firebaseapp.com",
  projectId: "nexu-calculator",
  storageBucket: "nexu-calculator.firebasestorage.app",
  messagingSenderId: "687842852458",
  appId: "1:687842852458:web:9061b450bdbcf6752d5413"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, app };
