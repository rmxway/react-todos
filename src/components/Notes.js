import React from 'react';

export const Notes = ({ notes }) => {
    return (
        <ul className='list-group'>
            {notes.map((note) => {
                return (
                    <li
                        className='list-group-item d-flex justify-content-between align-items-center'
                        key={note.id}
                    >
                        <div>
                            <strong>{note.title} - </strong>
                            <small>{new Date().toLocaleDateString()}</small>
                        </div>
                        <button
                            type='button'
                            className='btn btn-outline-danger btn-sm'
                        >
                            &times;
                        </button>
                    </li>
                );
            })}
        </ul>
    );
};
