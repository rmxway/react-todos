export function parseRequestBody<T>(body: unknown): T {
	if (typeof body !== 'object' || body === null) {
		const error = new Error('Неверный формат данных');
		error.name = 'ValidationError';
		throw error;
	}
	return body as T;
}
