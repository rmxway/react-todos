import { Alert } from '@/components/Alert';
import { Navbar } from '@/components/Navbar';
import { ModalPage } from '@/pages/ModalPage';
import { MotionPage } from '@/pages/MotionPage';
import { NotePage } from '@/pages/NotePage';
import { SelectPage } from '@/pages/SelectPage';
import { darkTheme } from '@/styles/themes/darkTheme';
import { lightTheme } from '@/styles/themes/lightTheme';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

import { store } from '@/store';

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
				<BrowserRouter>
					<AppStyled>
						<Alert />
						<Navbar
							updateTheme={() =>
								setColor(store.getState().app.color)
							}
						/>
						<AnimatePresence mode="wait">
							<Routes>
								<Route path="/" element={<NotePage />} />
								<Route path="/modal" element={<ModalPage />} />
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
					</AppStyled>
				</BrowserRouter>
			</ThemeProvider>
		</Provider>
	);
}

export default App;
