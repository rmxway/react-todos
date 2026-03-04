import { AnimatePresence } from 'framer-motion';
import { lazy, Suspense, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { AlertWrapper } from '@/features/alert';
import { Navbar } from '@/features/auth';
import { darkTheme, lightTheme } from '@/shared/config';
import { store } from '@/store';

import { AppStyled } from './App.styled';

const NotePage = lazy(() =>
	import('@/pages/NotePage').then((m) => ({ default: m.NotePage })),
);
const ModalPage = lazy(() =>
	import('@/pages/ModalPage').then((m) => ({ default: m.ModalPage })),
);
const SelectPage = lazy(() =>
	import('@/pages/SelectPage').then((m) => ({ default: m.SelectPage })),
);
const MotionPage = lazy(() =>
	import('@/pages/MotionPage').then((m) => ({ default: m.MotionPage })),
);

function App() {
	const [color, setColor] = useState(store.getState().app.color);
	const theme = color === 'dark' ? darkTheme : lightTheme;

	useEffect(() => {
		return store.subscribe(() => {
			setColor(store.getState().app.color);
		});
	}, []);

	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<BrowserRouter basename="/react-todos">
					<AppStyled>
						<AlertWrapper />
						<Navbar
							updateTheme={() =>
								setColor(store.getState().app.color)
							}
						/>
						<Suspense fallback={null}>
							<AnimatePresence mode="wait">
								<Routes>
									<Route path="/" element={<NotePage />} />
									<Route
										path="/modal"
										element={<ModalPage />}
									/>
									<Route
										path="/select"
										element={<SelectPage />}
									/>
									<Route
										path="/motion"
										element={<MotionPage />}
									/>
								</Routes>
							</AnimatePresence>
						</Suspense>
					</AppStyled>
				</BrowserRouter>
			</ThemeProvider>
		</Provider>
	);
}

export default App;
