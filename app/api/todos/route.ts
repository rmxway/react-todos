import { apiError, apiSuccess, apiUnauthorized } from '@api/utils/apiResponse';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth-options';
import { getAdminDb } from '@/lib/firebase-admin';

function getTodosRef(userId: string) {
	return getAdminDb().collection('users').doc(userId).collection('todos');
}

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
