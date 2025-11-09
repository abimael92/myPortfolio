// src/auth/tokenUtils.ts
import { db } from './firebaseConfig';
import { collection, doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

// Create token valid for 24 hours
export const generateAccessToken = async (email: string): Promise<string> => {
	const token = uuidv4();
	const expiresAt = Timestamp.fromDate(
		new Date(Date.now() + 24 * 60 * 60 * 1000)
	);

	await setDoc(doc(db, 'tokens', token), {
		email,
		expiresAt,
	});

	return token;
};

export const validateToken = async (token: string | null): Promise<boolean> => {
	if (!token) return false;

	const masterToken = process.env.NEXT_PUBLIC_MASTER_TOKEN;
	if (token === masterToken) return true;

	const tokenRef = doc(db, 'tokens', token);
	const tokenSnap = await getDoc(tokenRef);
	if (!tokenSnap.exists()) return false;

	const { expiresAt } = tokenSnap.data();
	return expiresAt.toDate() > new Date();
};
