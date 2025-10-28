// src/pages/api/portfolio.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../auth/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const docRef = doc(db, 'portfolio', 'main_data');
		const docSnap = await getDoc(docRef);

		if (!docSnap.exists()) {
			return res.status(404).json({ error: 'No portfolio data found' });
		}

		// Return data in a safe JSON format
		const portfolioData = docSnap.data();
		res.status(200).json(portfolioData);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Failed to fetch portfolio data' });
	}
}
