'use client';

import { useState } from 'react';

import { item } from '@/shared/lib/animations';
import { Input } from '@/shared/ui';
import { useAppDispatch } from '@/store/hooks';
import { showAlert } from '@/store/slices/alertSlice';
import { addNote } from '@/store/slices/usersSlice';
import type { Note } from '@/types';

import { FormWrapper } from './styled';

interface NoteFormProps {
	onSubmit?: (value: string) => void;
}

export const NoteForm = ({ onSubmit }: NoteFormProps) => {
	const [value, setValue] = useState('');
	const dispatch = useAppDispatch();

	const submitHandler = async (event: React.FormEvent) => {
		event.preventDefault();

		if (!value.trim()) {
			dispatch(
				showAlert({
					text: 'Введите название заметки',
					type: 'danger',
				}),
			);
			return;
		}

		try {
			const res = await fetch('/api/todos', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ title: value.trim() }),
			});

			const data = await res.json();

			if (!res.ok) {
				dispatch(
					showAlert({
						type: 'danger',
						text: data?.error ?? 'Ошибка при добавлении',
					}),
				);
				return;
			}

			const todo = data.todo as Note;
			dispatch(addNote(todo));
			dispatch(
				showAlert({
					text: 'Заметка была создана',
					type: 'success',
				}),
			);
			setValue('');
			onSubmit?.(value);
		} catch {
			// error already shown
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
