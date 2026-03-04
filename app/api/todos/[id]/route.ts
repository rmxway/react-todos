import { apiError, apiSuccess, apiUnauthorized } from '@api/utils/apiResponse';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth-options';
import { getAdminDb } from '@/lib/firebase-admin';

function getTodoRef(userId: string, todoId: string) {
	return getAdminDb()
		.collection('users')
		.doc(userId)
		.collection('todos')
		.doc(todoId);
}

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
