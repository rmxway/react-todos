import React from 'react';
import { Form } from '../components/Form';
import { Notes } from '../components/Notes';
import { H1 } from '../styled';

export const NotePage = () => {
    return (
        <>
            <div className="container">
                <H1>React Notes App</H1>
                <p>TodoList, Animations</p>
                <br />
                <br />
                <Form />
                <hr />
                <Notes />
            </div>
        </>
    );
};
