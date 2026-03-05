/**
 * Проверка существования пользователя с таким email в Firestore.
 * Запрос: users где email == trimmedEmail, limit 1; если есть документы — email занят.
 */
export async function checkEmailExists(email: string): Promise<boolean> {
	const { getAdminDb } = await import('@/lib/firebase-admin');
	const adminDb = getAdminDb();
	const trimmedEmail = email.trim().toLowerCase();
	const snapshot = await adminDb
		.collection('users')
		.where('email', '==', trimmedEmail)
		.limit(1)
		.get();
	return !snapshot.empty;
}
