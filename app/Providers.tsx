'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SessionProvider } from 'next-auth/react';
import { useEffect, useSyncExternalStore } from 'react';
import { ThemeProvider } from 'styled-components';

import { queryClient } from '@/lib/queryClient';
import { darkTheme, lightTheme, THEME_COOKIE_NAME } from '@/shared/config';
import type { Store } from '@/store';
import { changeTheme } from '@/store/slices/appSlice';

function getSnapshot(store: Store) {
	return () => store.getState().app.color;
}

function subscribe(store: Store) {
	return (callback: () => void) => store.subscribe(callback);
}

interface ProvidersProps {
	store: Store;
	children: React.ReactNode;
}

export function Providers({ store, children }: ProvidersProps) {
	const getColor = getSnapshot(store);
	const color = useSyncExternalStore(subscribe(store), getColor, getColor);

	const theme = color === 'dark' ? darkTheme : lightTheme;

	useEffect(() => {
		const stored = localStorage.getItem(THEME_COOKIE_NAME);
		if (stored === 'dark' || stored === 'light') {
			const current = store.getState().app.color;
			if (stored !== current) {
				document.cookie = `${THEME_COOKIE_NAME}=${stored}; path=/; max-age=31536000`;
				store.dispatch(changeTheme(stored));
			}
		}
	}, [store]);

	return (
		<QueryClientProvider client={queryClient}>
			<SessionProvider>
				<ThemeProvider {...{ theme }}>{children}</ThemeProvider>
			</SessionProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
