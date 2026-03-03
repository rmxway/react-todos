import { createSlice } from '@reduxjs/toolkit';

interface AppState {
	color: 'light' | 'dark';
}

const getInitialColor = (): 'light' | 'dark' => {
	if (typeof window === 'undefined') return 'light';
	const stored = localStorage.getItem('color');
	return (stored === 'dark' ? 'dark' : 'light') as 'light' | 'dark';
};

const initialState: AppState = {
	color: getInitialColor(),
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
