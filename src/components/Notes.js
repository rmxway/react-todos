import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { NonNotes, Note } from '../styled';
import { removeNote, showAlert } from '../store/actions';
import { item } from '../animations';

export const Notes = () => {
    const { notes } = useSelector((state) => state);
    const dispatch = useDispatch();
    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);

    const handleClick = (id) => {
        dispatch(removeNote(id));
        const payload = {
            text: 'Запись удалена',
        };
        dispatch(showAlert(payload));
    };
    return (
        <>
            {!notes.length && <NonNotes variants={item}>Нет записей</NonNotes>}
            <motion.ul variants={item} className="list-group">
                <AnimatePresence initial={false}>
                    {notes.map((note) => {
                        return (
                            <Note layout key={note.id}>
                                <div>
                                    <strong>{note.title} - </strong>
                                    <small>{note.date}</small>
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary btn-sm"
                                    onClick={() => handleClick(note.id)}
                                >
                                    &times;
                                </button>
                            </Note>
                        );
                    })}
                </AnimatePresence>
            </motion.ul>
        </>
    );
};
