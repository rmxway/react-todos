import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Alert } from './components/Alert';
import { Navbar } from './components/Navbar';
import { MotionPage } from './pages/MotionPage';
import { NotePage } from './pages/NotePage';
import { App, theme } from './styled';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './store/rootReducer';

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
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
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
                        <Switch>
                            <Route exact path={'/'} component={NotePage} />
                            <Route
                                exact
                                path={'/motion'}
                                component={MotionPage}
                            />
                        </Switch>
                    </App>
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    );
}

export default Application;
