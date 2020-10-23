import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Alert } from './components/Alert';
import { Colors } from './components/Colors';
import { Navbar } from './components/Navbar';
import { AlertState } from './context/alert/AlertState';
import { NotesState } from './context/notes/NotesState';
import { AboutPage } from './pages/AboutPage';
import { NotePage } from './pages/NotePage';

function App() {
    return (
        <NotesState>
            <AlertState>
                <BrowserRouter>
                    <div className="bottom-block">
                        <div className="container">
                            <p>Bootstrap colors:</p>
                            <Colors />
                        </div>
                    </div>
                    <div className="app">
                        <div className="container">
                            <Alert />
                        </div>
                        <Navbar />
                        <Switch>
                            <Route path={'/'} exact component={NotePage} />
                            <Route path={'/about'} component={AboutPage} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </AlertState>
        </NotesState>
    );
}

export default App;
