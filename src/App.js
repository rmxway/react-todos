import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { rootReducer } from './store/rootReducer';

import { AnimatePresence } from 'framer-motion';

import { Alert } from './components/Alert';
import { Navbar } from './components/Navbar';
import { MotionPage } from './pages/MotionPage';
import { NotePage } from './pages/NotePage';
import { App, theme } from './styled';

function Application() {
    const [color, setColor] = useState(
        localStorage.getItem('color') || 'light'
    );
    const toggleColor = () => {
        const newColor = color === 'light' ? 'dark' : 'light';
        setColor(newColor);
        localStorage.setItem('color', newColor);
    };

    const store = createStore(
        rootReducer,
        compose(
            applyMiddleware(thunk),
            window.__REDUX_DEVTOOLS_EXTENSION__ &&
                window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    );

    return (
        <Provider store={store}>
            <ThemeProvider theme={theme[color]}>
                <BrowserRouter>
                    <App layout>
                        <div className="container">
                            <Alert />
                        </div>
                        <Navbar onToggle={toggleColor} colorTheme={color} />
                        <AnimatePresence exitBeforeEnter>
                            <Switch>
                                <Route exact path={'/'} component={NotePage} />
                                <Route
                                    exact
                                    path={'/motion'}
                                    component={MotionPage}
                                />
                            </Switch>
                        </AnimatePresence>
                    </App>
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    );
}

export default Application;
