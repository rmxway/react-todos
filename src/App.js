import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Alert } from './components/Alert';
import { Navbar } from './components/Navbar';
import { AlertState } from './context/alert/AlertState';
import { NotesState } from './context/notes/NotesState';
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
    return (
        <NotesState>
            <AlertState>
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
            </AlertState>
        </NotesState>
    );
}

export default Application;
