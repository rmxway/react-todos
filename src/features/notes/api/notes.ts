import type { Note } from '@/types';

interface ApiError {
	success: false;
	error?: string;
}

interface GetNotesResponse {
	success: true;
	todos: Note[];
}

interface AddNoteResponse {
	success: true;
	todo: Note;
}

interface ToggleNoteResponse {
	success: true;
	completed: boolean;
}

async function handleResponse<T>(
	res: Response,
	parse: (data: unknown) => T,
): Promise<T> {
	const data = await res.json();

	if (!res.ok) {
		const error = data as ApiError;
		throw new Error(error.error ?? 'Request failed');
	}

	return parse(data);
}

export async function getNotes(): Promise<Note[]> {
	const res = await fetch('/api/todos');
	return handleResponse(res, (data) => (data as GetNotesResponse).todos);
}

export async function addNote(title: string): Promise<Note> {
	const res = await fetch('/api/todos', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ title }),
	});
	return handleResponse(res, (data) => (data as AddNoteResponse).todo);
}

export async function toggleNote(id: string): Promise<{ completed: boolean }> {
	const res = await fetch(`/api/todos/${id}`, { method: 'PATCH' });
	return handleResponse(res, (data) => ({
		completed: (data as ToggleNoteResponse).completed,
	}));
}

export async function deleteNote(id: string): Promise<void> {
	const res = await fetch(`/api/todos/${id}`, { method: 'DELETE' });
	if (!res.ok) {
		const data = (await res.json()) as ApiError;
		throw new Error(data.error ?? 'Failed to delete note');
	}
}

export async function deleteAllNotes(): Promise<void> {
	const res = await fetch('/api/todos', { method: 'DELETE' });
	if (!res.ok) {
		const data = (await res.json()) as ApiError;
		throw new Error(data.error ?? 'Failed to delete all notes');
	}
}
