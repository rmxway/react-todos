import React, { useReducer } from 'react';
import { ADD_NOTE, REMOVE_NOTE } from '../types';
import { NotesContext } from './notesContext';
import { notesReducer } from './notesReducer';

export const NotesState = ({ children }) => {
    const storage = JSON.parse(localStorage.getItem('notes'));
    const [state, dispatch] = useReducer(notesReducer, storage || []);

    const addNote = (title) => {
        dispatch({
            type: ADD_NOTE,
            title,
        });
    };

    const removeNote = (id) => {
        dispatch({
            type: REMOVE_NOTE,
            id,
        });
    };
    return (
        <NotesContext.Provider
            value={{
                addNote,
                removeNote,
                notes: state,
            }}
        >
            {children}
        </NotesContext.Provider>
    );
};
