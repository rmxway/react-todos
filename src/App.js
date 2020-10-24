import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Alert } from './components/Alert';
import { Navbar } from './components/Navbar';
import { AlertState } from './context/alert/AlertState';
import { NotesState } from './context/notes/NotesState';
import { AboutPage } from './pages/AboutPage';
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
                                <Route path={'/'} exact component={NotePage} />
                                <Route path={'/about'} component={AboutPage} />
                            </Switch>
                        </App>
                    </BrowserRouter>
                </ThemeProvider>
            </AlertState>
        </NotesState>
    );
}

export default Application;
