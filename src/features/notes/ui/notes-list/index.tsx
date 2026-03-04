import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';

import { item, notesVariant } from '@/shared/lib/animations';
import { Button } from '@/shared/ui';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { showAlert } from '@/store/slices/alertSlice';
import {
	changeCompleted,
	removeAllNotes,
	removeNote,
} from '@/store/slices/usersSlice';

import { NoteForm } from '../note-form';
import { NoteItem } from '../note-item';
import { AlertParagraph, List, NonNotes, NoteTitle } from './styled';

export const NotesList = () => {
	const { users } = useAppSelector((state) => state);
	const { currentUser } = users;

	const findUserNotes = users.currentUser.name
		? users.list.find((user) =>
				currentUser.name ? user.id === currentUser.id : null,
			)?.notes
		: undefined;

	const dispatch = useAppDispatch();
	const noItems = findUserNotes ? !findUserNotes.length : null;
	const trashIcon = <FontAwesomeIcon icon={faTrash} />;

	useEffect(() => {
		localStorage.setItem('users', JSON.stringify(users));
	}, [users]);

	const handleDelete = (id: number) => {
		dispatch(removeNote(id));
		dispatch(showAlert({ text: 'Запись удалена' }));
	};

	const handleRemoveAllNotes = () => {
		dispatch(removeAllNotes());
		dispatch(showAlert({ text: 'Все записи были удалены' }));
	};

	const handleToggle = (id: number) => {
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
						findUserNotes?.map((note, idx) => (
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
