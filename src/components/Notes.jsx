import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { NonNotes, Note, NoteTitle, MotionButton } from '../styled';
import { removeAllNotes, removeNote, showAlert } from '../store/actions';
import { item, notesVariant } from '../animations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export const Notes = () => {
    const { notes } = useSelector((state) => state);
    const dispatch = useDispatch();
    const noItems = !notes.length;
    const trashIcon = <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>;
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

    const handleRemoveAllNotes = () => {
        dispatch(removeAllNotes());
    };
    return (
        <motion.div variants={item}>
            {noItems && <NonNotes variants={item}>Нет записей</NonNotes>}
            {!noItems && (
                <NoteTitle>
                    Список задач
                    <MotionButton
                        onClick={handleRemoveAllNotes}
                        className="button"
                    >
                        удалить все {trashIcon}
                    </MotionButton>
                </NoteTitle>
            )}
            <motion.ul variants={notesVariant} className="list-group">
                <AnimatePresence>
                    {notes.map((note) => {
                        return (
                            <Note variants={item} layout key={note.id}>
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
        </motion.div>
    );
};
