import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { item } from '../animations';
import { addNote, showAlert } from '../store/actions';
import { Input } from '../styled';

export const Form = () => {
    const [value, setValue] = useState('');
    const dispatch = useDispatch();

    const submitHandler = (event) => {
        event.preventDefault();

        if (value.trim()) {
            const payload = {
                text: 'Заметка была создана',
                type: 'success',
            };
            dispatch(showAlert(payload));
            dispatch(addNote(value));
            setValue('');
        } else {
            const payload = {
                text: 'Введите название заметки',
                type: 'danger',
            };
            dispatch(showAlert(payload));
        }
    };

    return (
        <motion.form variants={item} onSubmit={submitHandler}>
            <Input
                type="text"
                value={value}
                onChange={(event) => setValue(event.target.value)}
                placeholder="Введите название задачи"
            />
        </motion.form>
    );
};
