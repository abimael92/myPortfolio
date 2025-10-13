// src/auth/firebaseConfig.ts
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { config } from '../config/env';

// Initialize Firebase
const app: FirebaseApp = initializeApp(config.firebase);

// Initialize services
export const db: Firestore = getFirestore(app);
export const auth: Auth = getAuth(app);

export default app;
