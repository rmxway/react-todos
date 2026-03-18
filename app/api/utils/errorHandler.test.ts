import { describe, expect, it } from 'vitest';

import { handleApiError } from './errorHandler';

describe('handleApiError', () => {
	it('should return 401 for UNAUTHORIZED', async () => {
		const res = handleApiError(new Error('UNAUTHORIZED'), 'default');
		const data = await res.json();
		expect(res.status).toBe(401);
		expect(data.success).toBe(false);
	});

	it('should return 400 for ValidationError', async () => {
		const err = new Error('Invalid format');
		err.name = 'ValidationError';
		const res = handleApiError(err, 'default');
		const data = await res.json();
		expect(res.status).toBe(400);
		expect(data.error).toBe('Invalid format');
	});

	it('should return 400 for generic Error', async () => {
		const res = handleApiError(new Error('Bad request'), 'default');
		const data = await res.json();
		expect(res.status).toBe(400);
		expect(data.error).toBe('Bad request');
	});

	it('should return 500 for unknown error', async () => {
		const res = handleApiError('string error', 'Server error');
		const data = await res.json();
		expect(res.status).toBe(500);
		expect(data.error).toBe('Server error');
	});
});
