import React, { Fragment, useContext } from 'react';
import { AnimatePresence } from 'framer-motion';
import { NotesContext } from '../context/notes/notesContext';
import { noteMotion } from '../animations';
import { NonNotes, Note } from '../styled';

export const Notes = ({ notes }) => {
    const { removeNote } = useContext(NotesContext);

    return (
        <Fragment>
            {!notes.length ? <NonNotes>Нет записей</NonNotes> : ''}
            <ul className="list-group">
                <AnimatePresence initial={false}>
                    {notes.map((note) => {
                        return (
                            <Note {...noteMotion} layout key={note.id}>
                                <div>
                                    <strong>{note.title} - </strong>
                                    <small>{note.date}</small>
                                </div>
                                <button
                                    onClick={() => removeNote(note.id)}
                                    type="button"
                                    className="btn btn-outline-secondary btn-sm"
                                >
                                    &times;
                                </button>
                            </Note>
                        );
                    })}
                </AnimatePresence>
            </ul>
        </Fragment>
    );
};
