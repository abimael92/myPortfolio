// src/pages/api/validate-token.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp, cert, getApps } from 'firebase-admin/app';

// Initialize Firebase Admin only if it hasn't been initialized yet
if (getApps().length === 0) {
	const serviceAccount = JSON.parse(
		process.env.FIREBASE_SERVICE_ACCOUNT_KEY || '{}'
	);
	initializeApp({
		credential: cert(serviceAccount),
	});
}

const db = getFirestore();

interface ValidateTokenRequest {
	token: string;
}

interface ValidateTokenResponse {
	success: boolean;
	message?: string;
}

interface AccessRequestDocument {
	code: string;
	expiresAt: any;
	createdAt?: any;
	name?: string;
	email?: string;
	message?: string;
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ValidateTokenResponse>
) {
	if (req.method !== 'POST') {
		return res
			.status(405)
			.json({ success: false, message: 'Method not allowed' });
	}

	const { token }: ValidateTokenRequest = req.body;

	if (!token) {
		return res.status(400).json({ success: false, message: 'Missing token' });
	}

	try {
		const snapshot = await db
			.collection('accessRequests')
			.where('code', '==', token)
			.limit(1)
			.get();

		if (snapshot.empty) {
			return res.status(401).json({ success: false, message: 'Invalid token' });
		}

		const doc = snapshot.docs[0];
		const data = doc.data() as AccessRequestDocument;

		// Handle expiration date properly
		let expiresAt: Date;
		if (data.expiresAt && typeof data.expiresAt.toDate === 'function') {
			// It's a Firestore Timestamp
			expiresAt = data.expiresAt.toDate();
		} else if (data.expiresAt instanceof Date) {
			// It's already a Date object
			expiresAt = data.expiresAt;
		} else {
			// It's a string or number, convert to Date
			expiresAt = new Date(data.expiresAt);
		}

		if (new Date() > expiresAt) {
			return res.status(403).json({ success: false, message: 'Token expired' });
		}

		res.status(200).json({ success: true });
	} catch (error) {
		console.error('Token validation error:', error);
		res.status(500).json({ success: false, message: 'Internal server error' });
	}
}
