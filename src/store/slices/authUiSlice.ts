import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { AuthMode } from '@/features/auth/lib/normalizeAuthMode';

const initialState: { authFormMode: AuthMode } = {
	authFormMode: 'login',
};

const authUiSlice = createSlice({
	name: 'authUi',
	initialState,
	reducers: {
		setAuthFormMode: (state, action: PayloadAction<AuthMode>) => {
			state.authFormMode = action.payload;
		},
	},
});

export const { setAuthFormMode } = authUiSlice.actions;
export default authUiSlice.reducer;
