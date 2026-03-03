import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { Note, User } from '@/types';

interface UsersState {
	list: User[];
	currentUser: Partial<User>;
}

const getInitialState = (): UsersState => {
	if (typeof window === 'undefined') {
		return { list: [], currentUser: {} };
	}
	try {
		const stored = localStorage.getItem('users');
		if (stored) {
			const parsed = JSON.parse(stored);
			return {
				list: parsed.list ?? [],
				currentUser: parsed.currentUser ?? {},
			};
		}
	} catch {
		// ignore
	}
	return { list: [], currentUser: {} };
};

const initialState = getInitialState();

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		addNote: (state, action: PayloadAction<string>) => {
			const curUser = state.list.find(
				(u) => u.id === state.currentUser.id,
			);
			if (!curUser) return;
			const newNote: Note = {
				id: Math.floor(Math.random() * Date.now()),
				title: action.payload,
				completed: false,
				date: `[ ${new Date().toLocaleDateString()} ] ${new Date().toLocaleTimeString()}`,
			};
			curUser.notes.push(newNote);
		},
		removeNote: (state, action: PayloadAction<number>) => {
			const curUser = state.list.find(
				(u) => u.id === state.currentUser.id,
			);
			if (!curUser) return;
			curUser.notes = curUser.notes.filter(
				(n) => n.id !== action.payload,
			);
		},
		removeAllNotes: (state) => {
			const curUser = state.list.find(
				(u) => u.id === state.currentUser.id,
			);
			if (!curUser) return;
			curUser.notes = [];
		},
		changeCompleted: (state, action: PayloadAction<number>) => {
			const curUser = state.list.find(
				(u) => u.id === state.currentUser.id,
			);
			if (!curUser) return;
			const note = curUser.notes.find((n) => n.id === action.payload);
			if (note) note.completed = !note.completed;
		},
		addUser: (
			state,
			action: PayloadAction<Omit<User, 'notes'> & { notes?: Note[] }>,
		) => {
			const user = {
				...action.payload,
				notes: action.payload.notes ?? [],
			};
			state.list.push(user as User);
		},
		currentUser: (state, action: PayloadAction<Partial<User>>) => {
			state.currentUser = action.payload;
		},
	},
});

export const {
	addNote,
	removeNote,
	removeAllNotes,
	changeCompleted,
	addUser,
	currentUser,
} = usersSlice.actions;
export default usersSlice.reducer;
