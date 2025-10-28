import admin from 'firebase-admin';

// Initialize Firebase Admin SDK once
if (!admin.apps.length) {
	if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
		throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY is not set');
	}

	admin.initializeApp({
		credential: admin.credential.cert(
			JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
		),
	});
}

export const adminDb = admin.firestore();

/**
 * Adds or updates a field in a Firestore document.
 * @param collection - Firestore collection name
 * @param docId - Document ID
 * @param fieldName - Field name to add/update
 * @param value - Value of the field
 */
export async function addFieldAdmin(
	collection: string,
	docId: string,
	fieldName: string,
	value: any
) {
	try {
		const docRef = adminDb.collection(collection).doc(docId);
		await docRef.update({ [fieldName]: value });
		console.log(
			`Field '${fieldName}' updated successfully in ${collection}/${docId}`
		);
	} catch (error) {
		console.error(`Error updating field '${fieldName}':`, error);
	}
}
