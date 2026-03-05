'use client';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';

import { NoteForm } from '@/features/notes/ui/note-form';
import { NoteItem } from '@/features/notes/ui/note-item';
import { item, notesVariant } from '@/shared/lib/animations';
import { Button, Select, type SelectItem } from '@/shared/ui';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { showAlert } from '@/store/slices/alertSlice';
import {
	changeCompleted,
	removeAllNotes,
	removeNote,
} from '@/store/slices/usersSlice';

import { AlertParagraph, List, NonNotes, NoteTitle, TopBlock } from './styled';

type NotesFilter = 'all' | 'completed' | 'active';

const FILTER_ITEMS: SelectItem[] = [
	{ id: 'all', title: 'Все' },
	{ id: 'active', title: 'Незавершенные' },
	{ id: 'completed', title: 'Завершенные' },
];

export const NotesList = () => {
	const users = useAppSelector((state) => state.users);
	const { currentUser, notes } = users;

	const dispatch = useAppDispatch();
	const [filter, setFilter] = useState<NotesFilter>('all');

	const filteredNotes = useMemo(
		() =>
			notes.filter((note) => {
				if (filter === 'completed') return note.completed;
				if (filter === 'active') return !note.completed;
				return true;
			}),
		[notes, filter],
	);

	const hasAnyNotes = notes.length > 0;
	const hasFilteredNotes = filteredNotes.length > 0;
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

	const handleFilterChange = (data: { selected: string }) => {
		const key = FILTER_ITEMS.find(
			(filterItem) => filterItem.title === data.selected,
		)?.id;
		if (!key) return;
		setFilter(key as NotesFilter);
	};

	return currentUser.name ? (
		<motion.div variants={item}>
			<NoteForm />
			{!hasAnyNotes && <NonNotes variants={item}>Нет записей</NonNotes>}
			{hasAnyNotes && (
				<TopBlock $gap={10} $columns={'1fr 170px'} $direction="column">
					<NoteTitle>
						Список задач
						<Button $size="medium" onClick={handleRemoveAllNotes}>
							удалить все {trashIcon}
						</Button>
					</NoteTitle>
					<Select
						list={FILTER_ITEMS}
						placeholder="Все"
						onChange={handleFilterChange}
					/>
					{!hasFilteredNotes && (
						<NonNotes variants={item}>
							Нет задач для выбранного фильтра
						</NonNotes>
					)}
				</TopBlock>
			)}
			<List variants={notesVariant}>
				<AnimatePresence>
					{hasAnyNotes &&
						filteredNotes.map((note, idx) => (
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
