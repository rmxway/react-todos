import React, { Fragment } from 'react';
import Colors from '../components/Colors';
import { Form } from '../components/Form';
import { Notes } from '../components/Notes';

export const Home = () => {
    const notes = new Array(3)
        .fill('')
        .map((_, idx) => ({ id: idx, title: 'Test' }));
    return (
        <Fragment>
            <div className='top-block'>
                <div className='container'>
                    <p>Bootstrap colors:</p>
                    <Colors />
                </div>
            </div>
            <div className='container'>
                <h1>React App.</h1>
                <p>TodoList. Animations.</p>
                <br />
                <Form />
                <hr />
                <Notes notes={notes} />
            </div>
        </Fragment>
    );
};
