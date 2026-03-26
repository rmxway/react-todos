import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import * as notesApi from './notes';

describe('notes API', () => {
	beforeEach(() => {
		vi.stubGlobal('fetch', vi.fn());
	});

	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it('getNotes should return notes from API', async () => {
		const notes = [
			{ id: '1', title: 'Test', completed: false, date: '2024-01-01' },
		];
		vi.mocked(fetch).mockResolvedValueOnce({
			ok: true,
			json: () => Promise.resolve({ success: true, notes }),
		} as Response);

		const result = await notesApi.getNotes();
		expect(result).toEqual(notes);
		expect(fetch).toHaveBeenCalledWith('/api/notes', expect.any(Object));
	});

	it('addNote should POST with title', async () => {
		const note = {
			id: '1',
			title: 'New',
			completed: false,
			date: '2024-01-01',
		};
		vi.mocked(fetch).mockResolvedValueOnce({
			ok: true,
			json: () => Promise.resolve({ success: true, note }),
		} as Response);

		const result = await notesApi.addNote('New');
		expect(result).toEqual(note);
		expect(fetch).toHaveBeenCalledWith('/api/notes', {
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
