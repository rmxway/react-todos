import { apiError, apiSuccess, apiUnauthorized } from '@api/utils/apiResponse';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth-options';
import { getAdminDb } from '@/lib/firebase-admin';

/**
 * Ссылка на подколлекцию todos пользователя в Firestore.
 * Путь: users/{userId}/todos
 */
function getTodosRef(userId: string) {
	return getAdminDb().collection('users').doc(userId).collection('todos');
}

/**
 * GET /api/todos — получить все todo текущего пользователя.
 * Firestore: читаем все документы из users/{userId}/todos и возвращаем массив.
 */
export async function GET() {
	const session = await getServerSession(authOptions);
	if (!session?.user?.id) {
		return apiUnauthorized();
	}

	const snapshot = await getTodosRef(session.user.id).get();
	const todos = snapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));

	return apiSuccess({ todos });
}

/**
 * POST /api/todos — создать новый todo.
 * Firestore: добавляем документ в users/{userId}/todos с полями title, completed, date.
 * ID документа генерируется Firestore автоматически.
 */
export async function POST(req: Request) {
	const session = await getServerSession(authOptions);
	if (!session?.user?.id) {
		return apiUnauthorized();
	}

	const body = await req.json();
	const title = typeof body?.title === 'string' ? body.title.trim() : '';
	if (!title) {
		return apiError('Заголовок обязателен', 400);
	}

	const date = `[ ${new Date().toLocaleDateString()} ] ${new Date().toLocaleTimeString()}`;
	const docRef = await getTodosRef(session.user.id).add({
		title,
		completed: false,
		date,
	});

	const todo = {
		id: docRef.id,
		title,
		completed: false,
		date,
	};

	return apiSuccess({ todo }, 201);
}

/**
 * DELETE /api/todos — удалить все todo текущего пользователя.
 * Firestore: batch delete — получаем все документы в users/{userId}/todos и удаляем их одним commit.
 */
export async function DELETE() {
	const session = await getServerSession(authOptions);
	if (!session?.user?.id) {
		return apiUnauthorized();
	}

	const snapshot = await getTodosRef(session.user.id).get();
	const batch = getAdminDb().batch();
	snapshot.docs.forEach((doc) => {
		batch.delete(doc.ref);
	});
	await batch.commit();

	return apiSuccess({});
}
