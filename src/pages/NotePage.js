import React, { Fragment, useContext, useEffect } from 'react';
import { Form } from '../components/Form';
import { Notes } from '../components/Notes';
import { NotesContext } from '../context/notes/notesContext';

export const NotePage = () => {
    const { notes } = useContext(NotesContext);

    useEffect(() => {
        console.log(notes);
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);

    return (
        <Fragment>
            <div className="container">
                <h1>React Notes App</h1>
                <p>TodoList, Animations</p>
                <br />
                <Form />
                <hr />
                {notes.length ? <Notes notes={notes} /> : <p>Нет записей</p>}
            </div>
        </Fragment>
    );
};
