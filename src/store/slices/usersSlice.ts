import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { User } from '@/types';

interface UsersState {
	list: User[];
	currentUser: Partial<User>;
}

const initialState: UsersState = {
	list: [],
	currentUser: {},
};

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		setCurrentUser: (state, action: PayloadAction<Partial<User>>) => {
			state.currentUser = action.payload;
		},
		addUser: (
			state,
			action: PayloadAction<
				Omit<User, 'notes'> & { notes?: User['notes'] }
			>,
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

export const { addUser, currentUser, setCurrentUser } = usersSlice.actions;
export default usersSlice.reducer;
