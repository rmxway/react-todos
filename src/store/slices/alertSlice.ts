import { createSlice } from '@reduxjs/toolkit';

interface AlertState {
	visible: boolean;
	type: 'warning' | 'danger' | 'success';
	text: string;
}

const initialState: AlertState = {
	visible: false,
	type: 'warning',
	text: '',
};

const alertSlice = createSlice({
	name: 'alert',
	initialState,
	reducers: {
		showAlert: (state, action) => {
			state.visible = true;
			state.type = action.payload.type ?? 'warning';
			state.text = action.payload.text ?? '';
		},
		hideAlert: (state) => {
			state.visible = false;
		},
	},
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;
