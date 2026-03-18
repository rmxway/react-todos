'use client';

import { Formik } from 'formik';
import { useRef } from 'react';

import { useAddNote } from '@/features/notes/api/hooks';
import { Grid } from '@/shared/layouts';
import { item } from '@/shared/lib/animations';
import { Button, ErrorMessage, Input } from '@/shared/ui';
import { useAppDispatch } from '@/store/hooks';
import { showAlert } from '@/store/slices/alertSlice';

import { NoteFormSchema } from './schema';
import { FormWrapper } from './styled';

interface NoteFormProps {
	onSubmit?: (value: string) => void;
}

export const NoteForm = ({ onSubmit }: NoteFormProps) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const dispatch = useAppDispatch();
	const addNoteMutation = useAddNote();

	return (
		<Formik
			initialValues={{ title: '' }}
			validationSchema={NoteFormSchema}
			onSubmit={(values, { resetForm }) => {
				const title = values.title.trim();
				addNoteMutation.mutate(title, {
					onSuccess: () => {
						dispatch(
							showAlert({
								text: 'Заметка была создана',
								type: 'success',
							}),
						);
						resetForm({ values: { title: '' } });
						onSubmit?.(title);
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
			}}
		>
			{({
				values,
				errors,
				touched,
				handleChange,
				handleBlur,
				handleSubmit,
			}) => (
				<FormWrapper variants={item} onSubmit={handleSubmit}>
					<Grid $gap={10} $columns={'1fr 100px'}>
						<div style={{ position: 'relative' }}>
							<Input
								ref={inputRef}
								type="text"
								name="title"
								placeholder="Введите название задачи"
								value={values.title}
								onChange={handleChange}
								onBlur={handleBlur}
								error={!!(errors.title && touched.title)}
								disabled={addNoteMutation.isPending}
							/>
							{errors.title && touched.title && (
								<ErrorMessage>{errors.title}</ErrorMessage>
							)}
						</div>
						<Button
							type="submit"
							$disabled={
								values.title.trim() === '' ||
								addNoteMutation.isPending
							}
						>
							Добавить
						</Button>
					</Grid>
				</FormWrapper>
			)}
		</Formik>
	);
};
