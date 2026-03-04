'use client';

import { useMemo } from 'react';
import { Provider } from 'react-redux';

import { createStore, type ThemeColor } from '@/store';

import { Providers } from './Providers';

interface StoreProviderProps {
	initialTheme: ThemeColor;
	children: React.ReactNode;
}

export function StoreProvider({ initialTheme, children }: StoreProviderProps) {
	const store = useMemo(() => createStore(initialTheme), [initialTheme]);

	return (
		<Provider {...{ store }}>
			<Providers {...{ store }}>{children}</Providers>
		</Provider>
	);
}
