import React, { Fragment, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NotesContext } from '../context/notes/notesContext';
import { noteMotion } from '../animations';
import { NonNotes } from '../styled';

export const Notes = ({ notes }) => {
    const { removeNote } = useContext(NotesContext);

    return (
        <Fragment>
            {!notes.length ? <NonNotes>Нет записей</NonNotes> : ''}
            <ul className="list-group">
                <AnimatePresence initial={false}>
                    {notes.map((note, idx) => {
                        return (
                            <motion.li
                                {...noteMotion}
                                layout
                                key={note.id}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                <div>
                                    <strong>{note.title} - </strong>
                                    <small>{note.date}</small>
                                </div>
                                <button
                                    onClick={() => removeNote(note.id)}
                                    type="button"
                                    className="btn btn-outline-danger btn-sm"
                                >
                                    &times;
                                </button>
                            </motion.li>
                        );
                    })}
                </AnimatePresence>
            </ul>
        </Fragment>
    );
};
