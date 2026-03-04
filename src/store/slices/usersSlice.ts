import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { Note, User } from '@/types';

interface UsersState {
	list: User[];
	currentUser: Partial<User>;
	notes: Note[];
}

const initialState: UsersState = {
	list: [],
	currentUser: {},
	notes: [],
};

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		setCurrentUser: (state, action: PayloadAction<Partial<User>>) => {
			state.currentUser = action.payload;
		},
		setNotes: (state, action: PayloadAction<Note[]>) => {
			state.notes = action.payload;
		},
		addNote: (state, action: PayloadAction<Note>) => {
			state.notes.push(action.payload);
		},
		removeNote: (state, action: PayloadAction<string>) => {
			state.notes = state.notes.filter((n) => n.id !== action.payload);
		},
		removeAllNotes: (state) => {
			state.notes = [];
		},
		changeCompleted: (state, action: PayloadAction<string>) => {
			const note = state.notes.find((n) => n.id === action.payload);
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
	setCurrentUser,
	setNotes,
} = usersSlice.actions;
export default usersSlice.reducer;
