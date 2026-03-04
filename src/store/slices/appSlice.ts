import { createSlice } from '@reduxjs/toolkit';

interface AppState {
	color: 'light' | 'dark';
}

const initialState: AppState = {
	color: 'light',
};

const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		changeTheme: (state, action) => {
			state.color = action.payload;
		},
	},
});

export const { changeTheme } = appSlice.actions;
export default appSlice.reducer;
