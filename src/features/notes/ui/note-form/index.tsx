import { useState } from 'react';

import { item } from '@/shared/lib/animations';
import { Input } from '@/shared/ui';
import { useAppDispatch } from '@/store/hooks';
import { showAlert } from '@/store/slices/alertSlice';
import { addNote } from '@/store/slices/usersSlice';

import { FormWrapper } from './styled';

interface NoteFormProps {
	onSubmit?: (value: string) => void;
}

export const NoteForm = ({ onSubmit }: NoteFormProps) => {
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
			onSubmit?.(value);
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
		<FormWrapper variants={item} onSubmit={submitHandler}>
			<Input
				type="text"
				value={value}
				onChange={(e) => setValue(e.target.value)}
				placeholder="Введите название задачи"
			/>
		</FormWrapper>
	);
};
