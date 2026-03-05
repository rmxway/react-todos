import { cert, getApp, getApps, initializeApp } from 'firebase-admin/app';
import type { Firestore } from 'firebase-admin/firestore';
import { getFirestore } from 'firebase-admin/firestore';

let _db: Firestore | null = null;

export function getAdminDb(): Firestore {
	if (_db) return _db;
	if (
		!process.env.FIREBASE_PROJECT_ID ||
		!process.env.FIREBASE_CLIENT_EMAIL ||
		!process.env.FIREBASE_PRIVATE_KEY
	) {
		throw new Error(
			'Firebase Admin не настроен. Задайте FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY.',
		);
	}
	const adminApp =
		getApps().length === 0
			? initializeApp({
					credential: cert({
						projectId: process.env.FIREBASE_PROJECT_ID,
						clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
						privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(
							/\\n/g,
							'\n',
						),
					}),
				})
			: getApp();
	_db = getFirestore(adminApp);
	return _db;
}
