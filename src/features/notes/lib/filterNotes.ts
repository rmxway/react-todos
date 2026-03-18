import type { Note } from '@/types';

export type NotesFilter = 'all' | 'completed' | 'active';

export type NotesSortBy = 'date' | 'title' | 'status';

interface FilterNotesParams {
	notes: Note[];
	filter: NotesFilter;
	searchQuery: string;
	sortBy: NotesSortBy;
}

export function filterNotes({
	notes,
	filter,
	searchQuery,
	sortBy,
}: FilterNotesParams): Note[] {
	let result = notes.filter((note) => {
		if (filter === 'completed') return note.completed;
		if (filter === 'active') return !note.completed;
		return true;
	});

	if (searchQuery.trim()) {
		const q = searchQuery.toLowerCase().trim();
		result = result.filter((note) => note.title.toLowerCase().includes(q));
	}

	return [...result].sort((a, b) => {
		if (sortBy === 'date') {
			return new Date(b.date).getTime() - new Date(a.date).getTime();
		}
		if (sortBy === 'title') {
			return a.title.localeCompare(b.title);
		}
		// status: completed down, active up
		if (a.completed === b.completed) return 0;
		return a.completed ? 1 : -1;
	});
}
