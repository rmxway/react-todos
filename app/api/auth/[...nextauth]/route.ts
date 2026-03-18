import { apiTooManyRequests } from '@api/utils/apiResponse';
import { checkRateLimit, getClientIp } from '@api/utils/rateLimit';
import NextAuth from 'next-auth';

import { authOptions } from '@/lib/auth-options';

/** NextAuth: GET/POST /api/auth/* — сессии, signIn, signOut, callbacks (в т.ч. подстановка user.id из Firestore). */
const handler = NextAuth(authOptions);

export async function GET(
	req: Request,
	context: { params: Promise<{ nextauth: string[] }> },
) {
	return handler(req, context);
}

export async function POST(
	req: Request,
	context: { params: Promise<{ nextauth: string[] }> },
) {
	const url = req.url ?? '';
	if (url.includes('callback/credentials')) {
		const result = checkRateLimit(getClientIp(req), 'auth');
		if (!result.success) {
			return apiTooManyRequests(
				'Слишком много попыток входа. Попробуйте позже.',
				result.retryAfter,
			);
		}
	}
	return handler(req, context);
}
