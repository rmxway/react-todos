import React, { useContext } from 'react';
import { NotesContext } from '../context/notes/notesContext';

export const Notes = ({ notes }) => {
    const { removeNote } = useContext(NotesContext);

    const handleClick = (id) => {
        removeNote(id);
    };
    console.log(notes);

    return (
        <ul className="list-group">
            {notes.map((note) => {
                return (
                    <li
                        className="list-group-item d-flex justify-content-between align-items-center"
                        key={note.id}
                    >
                        <div>
                            <strong>{note.title} - </strong>
                            <small>{note.date}</small>
                        </div>
                        <button
                            onClick={() => handleClick(note.id)}
                            type="button"
                            className="btn btn-outline-danger btn-sm"
                        >
                            &times;
                        </button>
                    </li>
                );
            })}
        </ul>
    );
};
