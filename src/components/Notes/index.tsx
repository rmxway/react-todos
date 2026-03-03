import { Checkbox } from '@/components/Checkbox';
import { Form } from '@/components/Form';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { item, notesVariant } from '@/styles/animations';
import { Div, FlexBlock, MotionButton } from '@/styles/base';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { showAlert } from '@/store/slices/alertSlice';
import {
	changeCompleted,
	removeAllNotes,
	removeNote,
} from '@/store/slices/usersSlice';

import {
	AlertParagraph,
	Close,
	List,
	NonNotes,
	Note,
	NoteNumber,
	NoteTitle,
} from './styled';

export const Notes = () => {
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

	const handleClick = (id: number) => {
		dispatch(removeNote(id));
		dispatch(showAlert({ text: 'Запись удалена' }));
	};

	const handleRemoveAllNotes = () => {
		dispatch(removeAllNotes());
		dispatch(showAlert({ text: 'Все записи были удалены' }));
	};

	return currentUser.name ? (
		<motion.div variants={item}>
			<Form />
			{noItems && <NonNotes variants={item}>Нет записей</NonNotes>}
			{!noItems && (
				<NoteTitle>
					Список задач
					<MotionButton
						onClick={handleRemoveAllNotes}
						className="button"
					>
						удалить все {trashIcon}
					</MotionButton>
				</NoteTitle>
			)}
			<List variants={notesVariant}>
				<AnimatePresence>
					{!noItems &&
						findUserNotes?.map((note, idx) => (
							<Note
								variants={item}
								layout
								key={note.id}
								completed={note.completed}
							>
								<FlexBlock>
									<Checkbox
										checked={note.completed}
										onChange={() =>
											dispatch(changeCompleted(note.id))
										}
									/>
									<NoteNumber>{idx + 1}</NoteNumber>
									<strong>{note.title}&nbsp; – &nbsp;</strong>
									<small>{note.date}</small>
								</FlexBlock>
								<Close
									type="button"
									onClick={() => handleClick(note.id)}
								>
									&times;
								</Close>
							</Note>
						))}
				</AnimatePresence>
			</List>
		</motion.div>
	) : (
		<AlertParagraph variants={item} transition={{ duration: 1 }}>
			<Div>Зайдите в свой аккаунт либо зарегистрируйте новый.</Div>
		</AlertParagraph>
	);
};
