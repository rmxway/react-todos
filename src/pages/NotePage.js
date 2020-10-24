import React, { Fragment, useContext, useEffect } from 'react';
import { Form } from '../components/Form';
import { Notes } from '../components/Notes';
import { NotesContext } from '../context/notes/notesContext';
import { H1 } from '../styled';

export const NotePage = () => {
    const { notes } = useContext(NotesContext);

    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);

    return (
        <Fragment>
            <div className="container">
                <H1>React Notes App</H1>
                <p>TodoList, Animations</p>
                <br />
                <Form />
                <hr />
                <Notes notes={notes} />
            </div>
        </Fragment>
    );
};
