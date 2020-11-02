import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import styled, { ThemeProvider } from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { lightTheme } from './styles/sc/lightTheme';
import { darkTheme } from './styles/sc/darkTheme';

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { rootReducer } from './store/rootReducer';

import { Alert } from './components/Alert';
import { Navbar } from './components/Navbar';
import { MotionPage } from './pages/MotionPage';
import { NotePage } from './pages/NotePage';
import { SelectPage } from './pages/SelectPage';

export const App = styled(motion.section)`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    flex: 1;
    padding-top: 65px;
    padding-bottom: 40px;
    color: ${(props) => props.theme.textColor};
    background-color: ${(props) => props.theme.bg};
    transition: 0.5s;
    margin: 0 auto;
    align-items: center;
`;

class Application extends React.Component {
    constructor(props) {
        super(props);

        this.reduxDevTools =
            window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__();

        this.store = createStore(
            rootReducer,
            compose(applyMiddleware(thunk), this.reduxDevTools)
        );

        this.state = {
            theme:
                this.store.getState().app.color === 'dark'
                    ? darkTheme
                    : lightTheme,
        };
    }

    updateColor = () => {
        this.setState({
            theme:
                this.store.getState().app.color === 'dark'
                    ? darkTheme
                    : lightTheme,
        });
    };

    render() {
        return (
            <Provider store={this.store}>
                <ThemeProvider theme={this.state.theme}>
                    <BrowserRouter>
                        <App>
                            <Alert />
                            <Navbar updateTheme={this.updateColor} />
                            <AnimatePresence exitBeforeEnter>
                                <Switch>
                                    <Route
                                        exact
                                        path="/"
                                        component={NotePage}
                                    />
                                    <Route
                                        exact
                                        path="/select"
                                        component={SelectPage}
                                    />
                                    <Route
                                        exact
                                        path="/motion"
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
