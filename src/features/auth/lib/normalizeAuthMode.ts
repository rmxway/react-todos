export type AuthMode = 'login' | 'register';

export function normalizeAuthMode(value: string | undefined): AuthMode {
	if (value === 'register') return 'register';
	return 'login';
}
