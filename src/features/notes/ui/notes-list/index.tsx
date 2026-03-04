'use client';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';

import { NoteForm } from '@/features/notes/ui/note-form';
import { NoteItem } from '@/features/notes/ui/note-item';
import { item, notesVariant } from '@/shared/lib/animations';
import { Button } from '@/shared/ui';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { showAlert } from '@/store/slices/alertSlice';
import {
	changeCompleted,
	removeAllNotes,
	removeNote,
} from '@/store/slices/usersSlice';

import { AlertParagraph, List, NonNotes, NoteTitle } from './styled';

export const NotesList = () => {
	const users = useAppSelector((state) => state.users);
	const { currentUser, notes } = users;

	const dispatch = useAppDispatch();
	const noItems = notes.length === 0;
	const trashIcon = <FontAwesomeIcon icon={faTrash} />;

	const handleDelete = async (id: string) => {
		const res = await fetch(`/api/todos/${id}`, { method: 'DELETE' });
		if (!res.ok) {
			dispatch(
				showAlert({
					type: 'danger',
					text: 'Не удалось удалить запись',
				}),
			);
			return;
		}
		dispatch(removeNote(id));
		dispatch(showAlert({ text: 'Запись удалена' }));
	};

	const handleRemoveAllNotes = async () => {
		const res = await fetch('/api/todos', { method: 'DELETE' });
		if (!res.ok) {
			dispatch(
				showAlert({
					type: 'danger',
					text: 'Не удалось удалить все записи',
				}),
			);
			return;
		}
		dispatch(removeAllNotes());
		dispatch(showAlert({ text: 'Все записи были удалены' }));
	};

	const handleToggle = async (id: string) => {
		const res = await fetch(`/api/todos/${id}`, {
			method: 'PATCH',
		});
		if (!res.ok) return;
		dispatch(changeCompleted(id));
	};

	return currentUser.name ? (
		<motion.div variants={item}>
			<NoteForm />
			{noItems && <NonNotes variants={item}>Нет записей</NonNotes>}
			{!noItems && (
				<NoteTitle>
					Список задач
					<Button onClick={handleRemoveAllNotes}>
						удалить все {trashIcon}
					</Button>
				</NoteTitle>
			)}
			<List variants={notesVariant}>
				<AnimatePresence>
					{!noItems &&
						notes.map((note, idx) => (
							<NoteItem
								key={note.id}
								id={note.id}
								title={note.title}
								date={note.date}
								completed={note.completed}
								index={idx}
								onToggle={handleToggle}
								onDelete={handleDelete}
							/>
						))}
				</AnimatePresence>
			</List>
		</motion.div>
	) : (
		<AlertParagraph variants={item} transition={{ duration: 1 }}>
			<div>Зайдите в свой аккаунт либо зарегистрируйте новый.</div>
		</AlertParagraph>
	);
};
