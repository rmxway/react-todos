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

interface UpdateNoteResponse {
	success: true;
	title: string;
}

const fetchOptions = {
	credentials: 'include' as const,
};

async function handleResponse<T>(
	res: Response,
	parse: (data: unknown) => T,
): Promise<T> {
	let data: unknown;
	try {
		data = await res.json();
	} catch {
		throw new Error('Invalid response format');
	}

	if (!res.ok) {
		const error = data as ApiError;
		throw new Error(error.error ?? 'Request failed');
	}

	return parse(data);
}

export async function getNotes(): Promise<Note[]> {
	const res = await fetch('/api/todos', fetchOptions);
	return handleResponse(res, (data) => (data as GetNotesResponse).todos);
}

export async function addNote(title: string): Promise<Note> {
	const res = await fetch('/api/todos', {
		...fetchOptions,
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ title }),
	});
	return handleResponse(res, (data) => (data as AddNoteResponse).todo);
}

export async function toggleNote(id: string): Promise<{ completed: boolean }> {
	const res = await fetch(`/api/todos/${id}`, {
		...fetchOptions,
		method: 'PATCH',
	});
	return handleResponse(res, (data) => ({
		completed: (data as ToggleNoteResponse).completed,
	}));
}

export async function updateNote(
	id: string,
	{ title }: { title: string },
): Promise<{ title: string }> {
	const res = await fetch(`/api/todos/${id}`, {
		...fetchOptions,
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ title }),
	});
	return handleResponse(res, (data) => ({
		title: (data as UpdateNoteResponse).title,
	}));
}

export async function deleteNote(id: string): Promise<void> {
	const res = await fetch(`/api/todos/${id}`, {
		...fetchOptions,
		method: 'DELETE',
	});
	return handleResponse(res, () => undefined);
}

export async function deleteAllNotes(): Promise<void> {
	const res = await fetch('/api/todos', {
		...fetchOptions,
		method: 'DELETE',
	});
	return handleResponse(res, () => undefined);
}
