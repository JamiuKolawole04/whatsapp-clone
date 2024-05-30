import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB69biIBn-Zty5qLkVX6JykMY2Pz-HiEFM",
  authDomain: "nextjs-whatsapp-clone-fb1dc.firebaseapp.com",
  projectId: "nextjs-whatsapp-clone-fb1dc",
  storageBucket: "nextjs-whatsapp-clone-fb1dc.appspot.com",
  messagingSenderId: "173510214010",
  appId: "1:173510214010:web:f4b1154f811df6091756c3",
  measurementId: "G-YRN393SC4M",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const firebaseAuth = getAuth(app);
