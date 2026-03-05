import { apiError, apiSuccess, apiUnauthorized } from '@api/utils/apiResponse';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth-options';
import { getAdminDb } from '@/lib/firebase-admin';

/**
 * Ссылка на один документ todo в Firestore.
 * Путь: users/{userId}/todos/{todoId}
 */
function getTodoRef(userId: string, todoId: string) {
	return getAdminDb()
		.collection('users')
		.doc(userId)
		.collection('todos')
		.doc(todoId);
}

/**
 * PATCH /api/todos/[id] — переключить completed у одного todo.
 * Firestore: читаем документ users/{userId}/todos/{id}, инвертируем completed, делаем update().
 */
export async function PATCH(
	_req: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	const session = await getServerSession(authOptions);
	if (!session?.user?.id) {
		return apiUnauthorized();
	}

	const { id } = await params;
	const ref = getTodoRef(session.user.id, id);
	const doc = await ref.get();

	if (!doc.exists) {
		return apiError('Заметка не найдена', 404);
	}

	const current = doc.data();
	const completed = !(current?.completed ?? false);
	await ref.update({ completed });

	return apiSuccess({ completed });
}

/**
 * DELETE /api/todos/[id] — удалить один todo по id.
 * Firestore: проверяем существование документа users/{userId}/todos/{id}, затем ref.delete().
 */
export async function DELETE(
	_req: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	const session = await getServerSession(authOptions);
	if (!session?.user?.id) {
		return apiUnauthorized();
	}

	const { id } = await params;
	const ref = getTodoRef(session.user.id, id);
	const doc = await ref.get();

	if (!doc.exists) {
		return apiError('Заметка не найдена', 404);
	}

	await ref.delete();
	return apiSuccess({});
}
