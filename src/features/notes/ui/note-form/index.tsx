'use client';

import React, { useRef, useState } from 'react';

import { useAddNote } from '@/features/notes/api/hooks';
import { item } from '@/shared/lib/animations';
import { Input } from '@/shared/ui';
import { useAppDispatch } from '@/store/hooks';
import { showAlert } from '@/store/slices/alertSlice';

import { FormWrapper } from './styled';

interface NoteFormProps {
	onSubmit?: (value: string) => void;
}

export const NoteForm = ({ onSubmit }: NoteFormProps) => {
	const [value, setValue] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);
	const dispatch = useAppDispatch();
	const addNoteMutation = useAddNote();

	const submitHandler = (event: React.FormEvent) => {
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

		addNoteMutation.mutate(value.trim(), {
			onSuccess: () => {
				dispatch(
					showAlert({
						text: 'Заметка была создана',
						type: 'success',
					}),
				);
				setValue('');
				onSubmit?.(value.trim());
				setTimeout(() => inputRef.current?.focus(), 0);
			},
			onError: (err) => {
				dispatch(
					showAlert({
						type: 'danger',
						text: err.message ?? 'Ошибка при добавлении',
					}),
				);
			},
		});
	};

	return (
		<FormWrapper variants={item} onSubmit={submitHandler}>
			<Input
				ref={inputRef}
				type="text"
				value={value}
				onChange={(e) => setValue(e.target.value)}
				placeholder="Введите название задачи"
				disabled={addNoteMutation.isPending}
			/>
		</FormWrapper>
	);
};
