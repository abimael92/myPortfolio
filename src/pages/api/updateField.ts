import type { NextApiRequest, NextApiResponse } from 'next';
import admin from 'firebase-admin';

if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.cert(
			JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY!)
		),
	});
}

const db = admin.firestore();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') return res.status(405).end();

	const { collection, docId, fieldName, value } = req.body;

	if (!collection || !docId || !fieldName) {
		return res.status(400).json({ error: 'Missing required fields' });
	}

	try {
		const docRef = db.collection(collection).doc(docId);
		await docRef.update({ [fieldName]: value });
		res.status(200).json({ success: true });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Failed to update document' });
	}
}
