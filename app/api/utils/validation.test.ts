import { describe, expect, it } from 'vitest';

import { parseRequestBody } from './validation';

describe('parseRequestBody', () => {
	it('should return object for valid body', () => {
		const body = { email: 'test@test.com', name: 'Test' };
		expect(parseRequestBody<typeof body>(body)).toEqual(body);
	});

	it('should throw for null', () => {
		expect(() => parseRequestBody(null)).toThrow('Неверный формат данных');
	});

	it('should throw for non-object', () => {
		expect(() => parseRequestBody('string')).toThrow(
			'Неверный формат данных',
		);
		expect(() => parseRequestBody(123)).toThrow('Неверный формат данных');
	});

	it('should set ValidationError name', () => {
		try {
			parseRequestBody(null);
		} catch (e) {
			expect((e as Error).name).toBe('ValidationError');
		}
	});
});
