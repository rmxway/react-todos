import React from 'react';
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

class Application extends React.Component {
    constructor(props) {
        super(props);

        this.store = createStore(
            rootReducer,
            compose(
                applyMiddleware(thunk),
                window.__REDUX_DEVTOOLS_EXTENSION__ &&
                    window.__REDUX_DEVTOOLS_EXTENSION__()
            )
        );

        this.state = {
            color: this.store.getState().app.color || 'light',
        };
    }

    updateColor = (themeColor) => {
        this.setState({ color: themeColor });
    };

    render() {
        return (
            <Provider store={this.store}>
                <ThemeProvider theme={theme[this.state.color]}>
                    <BrowserRouter>
                        <App layout>
                            <div className="container">
                                <Alert />
                            </div>
                            <Navbar
                                updateTheme={(themeColor) =>
                                    this.updateColor(themeColor)
                                }
                            />
                            <AnimatePresence exitBeforeEnter>
                                <Switch>
                                    <Route
                                        exact
                                        path={'/'}
                                        component={NotePage}
                                    />
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
}

export default Application;
