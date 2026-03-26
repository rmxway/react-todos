/**
 * In-memory rate limiter (fixed window).
 * For production with multiple instances, consider @upstash/ratelimit.
 */

const store = new Map<string, { count: number; resetAt: number }>();

const WINDOW_MS = 60 * 1000; // 1 minute

export const LIMITS = {
	register: 5,
	auth: 10,
	notes: 60,
} as const;

function getKey(ip: string, prefix: string) {
	return `${prefix}:${ip}`;
}

function cleanup() {
	const now = Date.now();
	for (const [key, data] of store.entries()) {
		if (data.resetAt < now) {
			store.delete(key);
		}
	}
}

export function checkRateLimit(
	ip: string,
	prefix: keyof typeof LIMITS,
): { success: true } | { success: false; retryAfter: number } {
	cleanup();

	const limit = LIMITS[prefix];
	const key = getKey(ip, prefix);
	const now = Date.now();
	const entry = store.get(key);

	if (!entry) {
		store.set(key, { count: 1, resetAt: now + WINDOW_MS });
		return { success: true };
	}

	if (entry.resetAt < now) {
		store.set(key, { count: 1, resetAt: now + WINDOW_MS });
		return { success: true };
	}

	if (entry.count >= limit) {
		return {
			success: false,
			retryAfter: Math.ceil((entry.resetAt - now) / 1000),
		};
	}

	entry.count += 1;
	return { success: true };
}

export function getClientIp(req: Request): string {
	const forwarded = req.headers.get('x-forwarded-for');
	if (forwarded) {
		return forwarded.split(',')[0].trim();
	}
	const realIp = req.headers.get('x-real-ip');
	if (realIp) {
		return realIp;
	}
	return '127.0.0.1';
}
