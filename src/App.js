import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Alert } from './components/Alert';
import { Navbar } from './components/Navbar';
import { AlertState } from './context/alert/AlertState';
import { About } from './pages/About';
import { Home } from './pages/Home';

function App() {
    return (
        <AlertState>
            <BrowserRouter>
                <div className='app'>
                    <div className='container'>
                        <Alert />
                    </div>
                    <Navbar />
                    <Switch>
                        <Route path={'/'} exact component={Home} />
                        <Route path={'/about'} component={About} />
                    </Switch>
                </div>
            </BrowserRouter>
        </AlertState>
    );
}

export default App;
