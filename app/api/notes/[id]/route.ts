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
 * Ссылка на один документ заметки в Firestore.
 * Путь: users/{userId}/notes/{noteId}
 */
function getNoteRef(userId: string, noteId: string) {
	return getAdminDb()
		.collection('users')
		.doc(userId)
		.collection('notes')
		.doc(noteId);
}

const TITLE_MAX_LENGTH = 200;

/**
 * PATCH /api/notes/[id] — переключить completed или обновить title.
 * Body: { title?: string } — если передан title, обновить его. Иначе — toggle completed.
 */
export async function PATCH(
	req: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	const rateLimitRes = checkNotesRateLimit(req);
	if (rateLimitRes) return rateLimitRes;

	const session = await getServerSession(authOptions);
	if (!session?.user?.id) {
		return apiUnauthorized();
	}

	const { id } = await params;
	const ref = getNoteRef(session.user.id, id);
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
 * DELETE /api/notes/[id] — удалить одну заметку по id.
 * Firestore: проверяем существование документа users/{userId}/notes/{id}, затем ref.delete().
 */
export async function DELETE(
	req: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	const rateLimitRes = checkNotesRateLimit(req);
	if (rateLimitRes) return rateLimitRes;

	const session = await getServerSession(authOptions);
	if (!session?.user?.id) {
		return apiUnauthorized();
	}

	const { id } = await params;
	const ref = getNoteRef(session.user.id, id);
	const doc = await ref.get();

	if (!doc.exists) {
		return apiError('Заметка не найдена', 404);
	}

	await ref.delete();
	return apiSuccess({});
}
