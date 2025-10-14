// src/pages/api/request-access.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../auth/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

interface RequestAccessBody {
	name: string;
	email: string;
	message: string;
}

interface RequestAccessResponse {
	success: boolean;
	code?: string;
}

interface AccessRequestData {
	name: string;
	email: string;
	message: string;
	code: string;
	expiresAt: Date;
	createdAt: any; // Firestore serverTimestamp
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<RequestAccessResponse>
) {
	if (req.method !== 'POST') {
		return res.status(405).json({ success: false });
	}

	const { name, email, message }: RequestAccessBody = req.body;

	if (!name || !email || !message) {
		return res.status(400).json({ success: false });
	}

	const code = crypto.randomBytes(3).toString('hex').toUpperCase();
	const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

	try {
		const requestData: AccessRequestData = {
			name,
			email,
			message,
			code,
			expiresAt,
			createdAt: serverTimestamp(),
		};

		await addDoc(collection(db, 'accessRequests'), requestData);

		// Create transporter with proper typing
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.ADMIN_EMAIL,
				pass: process.env.ADMIN_EMAIL_PASS,
			},
		});

		// Send email with proper typing
		const mailOptions: nodemailer.SendMailOptions = {
			from: process.env.ADMIN_EMAIL,
			to: 'abimael1992g@gmail.com',
			subject: 'New Access Request',
			text: `From: ${name} <${email}>\n\nMessage: ${message}\n\nAccess Code: ${code} (expires in 24h)`,
		};

		await transporter.sendMail(mailOptions);

		res.status(200).json({ success: true, code });
	} catch (error) {
		console.error('Access request error:', error);
		res.status(500).json({ success: false });
	}
}
