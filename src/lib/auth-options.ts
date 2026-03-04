import bcrypt from 'bcryptjs';
import type { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { CREDENTIALS_ERROR_ID } from '@/shared/config';

export const authOptions: AuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					return {
						id: CREDENTIALS_ERROR_ID,
						error: 'Введите email и пароль',
					} as unknown as { id: string; email: string; name: string };
				}

				try {
					const { getAdminDb } = await import('@/lib/firebase-admin');
					const adminDb = getAdminDb();

					const email = credentials.email.trim().toLowerCase();
					const querySnapshot = await adminDb
						.collection('users')
						.where('email', '==', email)
						.get();

					if (querySnapshot.empty) {
						return {
							id: CREDENTIALS_ERROR_ID,
							error: 'Пользователь не найден',
						} as unknown as {
							id: string;
							email: string;
							name: string;
						};
					}

					const userDoc = querySnapshot.docs[0];
					const userData = userDoc.data();
					const passwordHash = userData.passwordHash as string;

					const isPasswordValid = await bcrypt.compare(
						credentials.password,
						passwordHash,
					);

					if (!isPasswordValid) {
						return {
							id: CREDENTIALS_ERROR_ID,
							error: 'Неверный пароль',
						} as unknown as {
							id: string;
							email: string;
							name: string;
						};
					}

					return {
						id: userDoc.id,
						email: userData.email as string,
						name: userData.name as string,
					};
				} catch (err) {
					// eslint-disable-next-line no-console
					console.error('[auth] authorize error:', err);
					return {
						id: CREDENTIALS_ERROR_ID,
						error: 'Ошибка входа. Проверьте подключение и настройки сервера.',
					} as unknown as { id: string; email: string; name: string };
				}
			},
		}),
	],
	callbacks: {
		async signIn({ user }) {
			if (
				user?.id === CREDENTIALS_ERROR_ID &&
				'error' in user &&
				typeof (user as { error: string }).error === 'string'
			) {
				throw new Error((user as { error: string }).error);
			}
			return true;
		},
		async jwt({ token, user }) {
			if (user && user.id !== CREDENTIALS_ERROR_ID) {
				token.id = user.id;
				token.email = user.email ?? null;
				token.name = user.name ?? null;
			}
			return token;
		},
		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.id as string;
				session.user.email = token.email ?? null;
				session.user.name = token.name ?? null;
			}
			return session;
		},
	},
	pages: {
		signIn: '/',
	},
	session: {
		strategy: 'jwt',
		maxAge: Number(process.env.SESSION_MAX_AGE_MINUTES ?? 60) * 60,
	},
	secret: process.env.NEXTAUTH_SECRET,
};
