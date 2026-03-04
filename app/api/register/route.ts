import { apiError, apiSuccess } from '@api/utils/apiResponse';
import { handleApiError } from '@api/utils/errorHandler';
import { checkEmailExists } from '@api/utils/users';
import { parseRequestBody } from '@api/utils/validation';
import bcrypt from 'bcryptjs';

import { getAdminDb } from '@/lib/firebase-admin';

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { email, password, name } = parseRequestBody<{
			email?: string;
			password?: string;
			name?: string;
		}>(body);

		if (!email || !password) {
			return apiError('Email и пароль обязательны');
		}

		const trimmedEmail = email.trim().toLowerCase();
		if (!trimmedEmail) {
			return apiError('Email обязателен');
		}

		if (password.length < 6) {
			return apiError('Пароль должен быть не менее 6 символов');
		}

		const emailExists = await checkEmailExists(trimmedEmail);
		if (emailExists) {
			return apiError('Пользователь с таким email уже существует');
		}

		const passwordHash = await bcrypt.hash(password, 10);

		const newUser = {
			email: trimmedEmail,
			passwordHash,
			name: (name ?? '').trim() || trimmedEmail,
			createdAt: new Date().toISOString(),
		};

		const adminDb = getAdminDb();
		const docRef = await adminDb.collection('users').add(newUser);

		return apiSuccess(
			{
				user: {
					id: docRef.id,
					email: newUser.email,
					name: newUser.name,
				},
			},
			201,
		);
	} catch (error) {
		return handleApiError(error, 'Произошла ошибка при регистрации');
	}
}
