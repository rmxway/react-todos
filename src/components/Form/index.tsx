import { item } from '@/styles/animations';
import { Input } from '@/styles/base';
import { motion } from 'framer-motion';
import { useState } from 'react';

import { useAppDispatch } from '@/store/hooks';
import { showAlert } from '@/store/slices/alertSlice';
import { addNote } from '@/store/slices/usersSlice';

export const Form = () => {
	const [value, setValue] = useState('');
	const dispatch = useAppDispatch();

	const submitHandler = (event: React.FormEvent) => {
		event.preventDefault();

		if (value.trim()) {
			dispatch(
				showAlert({
					text: 'Заметка была создана',
					type: 'success',
				}),
			);
			dispatch(addNote(value));
			setValue('');
		} else {
			dispatch(
				showAlert({
					text: 'Введите название заметки',
					type: 'danger',
				}),
			);
		}
	};

	return (
		<motion.form variants={item} onSubmit={submitHandler}>
			<Input
				type="text"
				value={value}
				onChange={(e) => setValue(e.target.value)}
				placeholder="Введите название задачи"
			/>
		</motion.form>
	);
};
