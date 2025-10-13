import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { config } from '../config/env';

// Initialize Firebase
const app = initializeApp(config.firebase);

// Initialize services
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;