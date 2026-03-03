import { configureStore } from '@reduxjs/toolkit';

import alertReducer from './slices/alertSlice';
import appReducer from './slices/appSlice';
import usersReducer from './slices/usersSlice';

export const store = configureStore({
	reducer: {
		alert: alertReducer,
		app: appReducer,
		users: usersReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
