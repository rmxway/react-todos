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

function checkTodosRateLimit(req: Request) {
	const result = checkRateLimit(getClientIp(req), 'todos');
	if (!result.success) {
		return apiTooManyRequests(
			'Слишком много запросов. Попробуйте позже.',
			result.retryAfter,
		);
	}
	return null;
}

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

const TITLE_MAX_LENGTH = 200;

/**
 * PATCH /api/todos/[id] — переключить completed или обновить title.
 * Body: { title?: string } — если передан title, обновить его. Иначе — toggle completed.
 */
export async function PATCH(
	req: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	const rateLimitRes = checkTodosRateLimit(req);
	if (rateLimitRes) return rateLimitRes;

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

	let body: { title?: string } = {};
	try {
		body = await req.json();
	} catch {
		// empty body
	}

	const current = doc.data();

	if (typeof body.title === 'string') {
		const title = body.title.trim();
		if (title.length === 0) {
			return apiError('Заголовок не может быть пустым', 400);
		}
		if (title.length > TITLE_MAX_LENGTH) {
			return apiError('Заголовок не более 200 символов', 400);
		}
		await ref.update({ title });
		return apiSuccess({ title });
	}

	const completed = !(current?.completed ?? false);
	await ref.update({ completed });
	return apiSuccess({ completed });
}

/**
 * DELETE /api/todos/[id] — удалить один todo по id.
 * Firestore: проверяем существование документа users/{userId}/todos/{id}, затем ref.delete().
 */
export async function DELETE(
	req: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	const rateLimitRes = checkTodosRateLimit(req);
	if (rateLimitRes) return rateLimitRes;

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
