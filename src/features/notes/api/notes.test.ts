import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import * as notesApi from './notes';

describe('notes API', () => {
	beforeEach(() => {
		vi.stubGlobal('fetch', vi.fn());
	});

	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it('getNotes should return todos from API', async () => {
		const todos = [
			{ id: '1', title: 'Test', completed: false, date: '2024-01-01' },
		];
		vi.mocked(fetch).mockResolvedValueOnce({
			ok: true,
			json: () => Promise.resolve({ success: true, todos }),
		} as Response);

		const result = await notesApi.getNotes();
		expect(result).toEqual(todos);
		expect(fetch).toHaveBeenCalledWith('/api/todos', expect.any(Object));
	});

	it('addNote should POST with title', async () => {
		const todo = {
			id: '1',
			title: 'New',
			completed: false,
			date: '2024-01-01',
		};
		vi.mocked(fetch).mockResolvedValueOnce({
			ok: true,
			json: () => Promise.resolve({ success: true, todo }),
		} as Response);

		const result = await notesApi.addNote('New');
		expect(result).toEqual(todo);
		expect(fetch).toHaveBeenCalledWith('/api/todos', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ title: 'New' }),
			credentials: 'include',
		});
	});

	it('deleteNote should throw on error', async () => {
		vi.mocked(fetch).mockResolvedValueOnce({
			ok: false,
			json: () => Promise.resolve({ success: false, error: 'Not found' }),
		} as Response);

		await expect(notesApi.deleteNote('1')).rejects.toThrow('Not found');
	});
});
