import { configureStore } from '@reduxjs/toolkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, type RenderOptions } from '@testing-library/react';
import type { PropsWithChildren, ReactElement } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import { lightTheme } from '@/shared/config';
import alertReducer from '@/store/slices/alertSlice';
import appReducer from '@/store/slices/appSlice';
import authUiReducer from '@/store/slices/authUiSlice';
import usersReducer from '@/store/slices/usersSlice';

const createTestStore = () =>
	configureStore({
		reducer: {
			alert: alertReducer,
			app: appReducer,
			authUi: authUiReducer,
			users: usersReducer,
		},
		preloadedState: {
			users: {
				list: [],
				currentUser: { id: '', name: '', login: '' },
			},
		},
	});

const createTestQueryClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: { retry: false },
			mutations: { retry: false },
		},
	});

function createWrapper() {
	const store = createTestStore();
	const queryClient = createTestQueryClient();

	return function Wrapper({ children }: PropsWithChildren) {
		return (
			<Provider store={store}>
				<QueryClientProvider client={queryClient}>
					<ThemeProvider theme={lightTheme}>{children}</ThemeProvider>
				</QueryClientProvider>
			</Provider>
		);
	};
}

export function renderWithProviders(
	ui: ReactElement,
	options?: Omit<RenderOptions, 'wrapper'>,
) {
	const Wrapper = createWrapper();
	return render(ui, {
		wrapper: Wrapper,
		...options,
	});
}
