import { AnimatePresence, motion } from 'framer-motion';
import { lazy, Suspense, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

import { Alert } from '@/components/Alert';
import { Navbar } from '@/components/Navbar';
import { store } from '@/store';
import { darkTheme } from '@/styles/themes/darkTheme';
import { lightTheme } from '@/styles/themes/lightTheme';

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

const AppStyled = styled(motion.section)`
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	flex: 1;
	padding-top: 65px;
	padding-bottom: 40px;
	color: ${(props) => props.theme.textColor};
	background-color: ${(props) => props.theme.bg};
	transition: 0.5s;
	align-items: center;
`;

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
						<Alert />
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
