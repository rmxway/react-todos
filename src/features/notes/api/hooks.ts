import { useMutation, useQuery } from '@tanstack/react-query';

import { queryClient } from '@/lib/queryClient';
import type { Note } from '@/types';

import * as notesApi from './notes';

export const NOTES_KEY = ['notes'] as const;

export function useNotes(enabled = true) {
	return useQuery({
		queryKey: NOTES_KEY,
		queryFn: notesApi.getNotes,
		enabled,
	});
}

export function useAddNote() {
	return useMutation({
		mutationFn: notesApi.addNote,
		onMutate: async (title) => {
			await queryClient.cancelQueries({ queryKey: NOTES_KEY });
			const previous = queryClient.getQueryData<Note[]>(NOTES_KEY);

			const tempId = `temp-${Date.now()}`;
			const optimisticNote: Note = {
				id: tempId,
				title,
				completed: false,
				date: new Date().toISOString(),
			};

			queryClient.setQueryData<Note[]>(NOTES_KEY, (old = []) => [
				...old,
				optimisticNote,
			]);
			return { previous, tempId };
		},
		onSuccess: (newNote, _title, context) => {
			if (context?.tempId) {
				queryClient.setQueryData<Note[]>(NOTES_KEY, (old = []) =>
					old.map((note) =>
						note.id === context.tempId
							? { ...newNote, _optimisticId: context.tempId }
							: note,
					),
				);
			}
		},
		onError: (_err, _vars, context) => {
			queryClient.setQueryData(NOTES_KEY, context?.previous);
		},
	});
}

export function useToggleNote() {
	return useMutation({
		mutationFn: notesApi.toggleNote,
		onMutate: async (id) => {
			await queryClient.cancelQueries({ queryKey: NOTES_KEY });
			const previous = queryClient.getQueryData<Note[]>(NOTES_KEY);

			queryClient.setQueryData<Note[]>(NOTES_KEY, (old = []) =>
				old.map((note) =>
					note.id === id
						? { ...note, completed: !note.completed }
						: note,
				),
			);

			return { previous };
		},
		onError: (_err, _vars, context) => {
			queryClient.setQueryData(NOTES_KEY, context?.previous);
		},
	});
}

const isTempId = (id: string) => id.startsWith('temp-');

export function useDeleteNote() {
	return useMutation({
		mutationFn: async (id: string) => {
			if (isTempId(id)) return;
			return notesApi.deleteNote(id);
		},
		onMutate: async (id) => {
			await queryClient.cancelQueries({ queryKey: NOTES_KEY });
			const previous = queryClient.getQueryData<Note[]>(NOTES_KEY);
			if (isTempId(id)) {
				queryClient.setQueryData<Note[]>(NOTES_KEY, (old = []) =>
					old.filter((note) => note.id !== id),
				);
			}
			return { previous };
		},
		onSuccess: (_data, id) => {
			if (!isTempId(id)) {
				queryClient.setQueryData<Note[]>(NOTES_KEY, (old = []) =>
					old.filter((note) => note.id !== id),
				);
			}
		},
		onError: (_err, _vars, context) => {
			queryClient.setQueryData(NOTES_KEY, context?.previous);
		},
	});
}

export function useDeleteAllNotes() {
	return useMutation({
		mutationFn: notesApi.deleteAllNotes,
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey: NOTES_KEY });
			const previous = queryClient.getQueryData<Note[]>(NOTES_KEY);
			queryClient.setQueryData<Note[]>(NOTES_KEY, []);
			return { previous };
		},
		onError: (_err, _vars, context) => {
			queryClient.setQueryData(NOTES_KEY, context?.previous);
		},
	});
}
