import {
	apiError,
	apiSuccess,
	apiTooManyRequests,
	apiUnauthorized,
} from '@api/utils/apiResponse';
import { checkRateLimit, getClientIp } from '@api/utils/rateLimit';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth-options';
import { getAdminDb } from '@/lib/firebase-admin';

function checkNotesRateLimit(req: Request) {
	const result = checkRateLimit(getClientIp(req), 'notes');
	if (!result.success) {
		return apiTooManyRequests(
			'Слишком много запросов. Попробуйте позже.',
			result.retryAfter,
		);
	}
	return null;
}

/**
 * Ссылка на подколлекцию notes пользователя в Firestore.
 * Путь: users/{userId}/notes
 */
function getNotesRef(userId: string) {
	return getAdminDb().collection('users').doc(userId).collection('notes');
}

/**
 * GET /api/notes — получить все заметки текущего пользователя.
 * Firestore: читаем все документы из users/{userId}/notes и возвращаем массив.
 */
export async function GET(req: Request) {
	const rateLimitRes = checkNotesRateLimit(req);
	if (rateLimitRes) return rateLimitRes;

	const session = await getServerSession(authOptions);
	if (!session?.user?.id) {
		return apiUnauthorized();
	}

	const snapshot = await getNotesRef(session.user.id).get();
	const notes = snapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));

	return apiSuccess({ notes });
}

/**
 * POST /api/notes — создать новую заметку.
 * Firestore: добавляем документ в users/{userId}/notes с полями title, completed, date.
 * ID документа генерируется Firestore автоматически.
 */
export async function POST(req: Request) {
	const rateLimitRes = checkNotesRateLimit(req);
	if (rateLimitRes) return rateLimitRes;

	const session = await getServerSession(authOptions);
	if (!session?.user?.id) {
		return apiUnauthorized();
	}

	const body = await req.json();
	const title = typeof body?.title === 'string' ? body.title.trim() : '';
	if (!title) {
		return apiError('Заголовок обязателен', 400);
	}
	if (title.length > 200) {
		return apiError('Заголовок не более 200 символов', 400);
	}

	const date = `[ ${new Date().toLocaleDateString()} ] ${new Date().toLocaleTimeString()}`;
	const docRef = await getNotesRef(session.user.id).add({
		title,
		completed: false,
		date,
	});

	const note = {
		id: docRef.id,
		title,
		completed: false,
		date,
	};

	return apiSuccess({ note }, 201);
}

/**
 * DELETE /api/notes — удалить все заметки текущего пользователя.
 * Firestore: batch delete — получаем все документы в users/{userId}/notes и удаляем их одним commit.
 */
export async function DELETE(req: Request) {
	const rateLimitRes = checkNotesRateLimit(req);
	if (rateLimitRes) return rateLimitRes;

	const session = await getServerSession(authOptions);
	if (!session?.user?.id) {
		return apiUnauthorized();
	}

	const snapshot = await getNotesRef(session.user.id).get();
	const batch = getAdminDb().batch();
	snapshot.docs.forEach((doc) => {
		batch.delete(doc.ref);
	});
	await batch.commit();

	return apiSuccess({});
}
