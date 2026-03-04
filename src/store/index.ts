import { configureStore } from '@reduxjs/toolkit';

import alertReducer from './slices/alertSlice';
import appReducer from './slices/appSlice';
import usersReducer from './slices/usersSlice';

export type ThemeColor = 'light' | 'dark';

export function createStore(initialTheme: ThemeColor = 'light') {
	return configureStore({
		reducer: {
			alert: alertReducer,
			app: appReducer,
			users: usersReducer,
		},
		preloadedState: { app: { color: initialTheme } },
	});
}

export type Store = ReturnType<typeof createStore>;
export type RootState = ReturnType<Store['getState']>;
export type AppDispatch = Store['dispatch'];
