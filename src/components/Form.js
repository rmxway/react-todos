import React, { useState, useContext } from 'react';
import { AlertContext } from '../context/alert/alertContext';
import { NotesContext } from '../context/notes/notesContext';
import { Input } from '../styled';

export const Form = () => {
    const [value, setValue] = useState('');
    const alert = useContext(AlertContext);
    const { addNote } = useContext(NotesContext);

    const submitHandler = (event) => {
        event.preventDefault();

        if (value.trim()) {
            alert.show('Заметка была создана', 'success');
            addNote(value);
            setValue('');
        } else {
            alert.show('Введите название заметки', 'danger');
        }
    };

    return (
        <form onSubmit={submitHandler}>
            <div className="form-group">
                <Input
                    type="text"
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    placeholder="Введите название задачи"
                    className="form-control"
                />
            </div>
        </form>
    );
};
