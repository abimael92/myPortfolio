import { db } from './firebaseConfig';
import {
    collection,
    doc,
    getDoc,
    setDoc,
    Timestamp,
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

// Create token valid for 24 hours
export const generateAccessToken = async (email) => {
    const token = uuidv4();
    const expiresAt = Timestamp.fromDate(new Date(Date.now() + 24 * 60 * 60 * 1000));

    await setDoc(doc(db, 'tokens', token), {
        email,
        expiresAt,
    });

    return token;
};

export const validateToken = async (token) => {
    if (!token) return false;
    const tokenRef = doc(db, 'tokens', token);
    const tokenSnap = await getDoc(tokenRef);
    if (!tokenSnap.exists()) return false;

    const { expiresAt } = tokenSnap.data();
    return expiresAt.toDate() > new Date();
};

