'use client';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useMemo, useState } from 'react';

import {
	useDeleteAllNotes,
	useDeleteNote,
	useNotes,
	useToggleNote,
} from '@/features/notes/api/hooks';
import { NoteForm } from '@/features/notes/ui/note-form';
import { NoteItemContent, NoteStyled } from '@/features/notes/ui/note-item';
import { Flex } from '@/shared/layouts';
import { item, noteMotion } from '@/shared/lib/animations';
import { Button, Modal, Select, type SelectItem } from '@/shared/ui';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { showAlert } from '@/store/slices/alertSlice';

import { AlertParagraph, List, NonNotes, NoteTitle, TopBlock } from './styled';

type NotesFilter = 'all' | 'completed' | 'active';

const FILTER_ITEMS: SelectItem[] = [
	{ id: 'all', title: 'Все' },
	{ id: 'active', title: 'Незавершенные' },
	{ id: 'completed', title: 'Завершенные' },
];

export const NotesList = () => {
	const { currentUser } = useAppSelector((state) => state.users);
	const isLoggedIn = !!currentUser?.name;
	const { data: notes = [], isLoading } = useNotes(isLoggedIn);
	const toggleMutation = useToggleNote();
	const deleteMutation = useDeleteNote();
	const deleteAllMutation = useDeleteAllNotes();

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
	const [deletingId, setDeletingId] = useState<string | null>(null);
	const [isDeleteAllModalOpen, setIsDeleteAllModalOpen] = useState(false);

	const handleToggle = useCallback(
		(id: string) => {
			toggleMutation.mutate(id, {
				onError: (err) => {
					dispatch(
						showAlert({
							type: 'danger',
							text: err.message ?? 'Ошибка переключения',
						}),
					);
				},
			});
		},
		[toggleMutation, dispatch],
	);

	const handleDelete = useCallback(
		(id: string) => {
			setDeletingId(id);

			deleteMutation.mutate(id, {
				onSuccess: () => {
					setDeletingId(null);
					dispatch(showAlert({ text: 'Запись удалена' }));
				},
				onError: (err) => {
					setDeletingId(null);
					dispatch(
						showAlert({
							type: 'danger',
							text: err.message ?? 'Не удалось удалить запись',
						}),
					);
				},
			});
		},
		[deleteMutation, dispatch],
	);

	const handleRemoveAllNotes = () => {
		setIsDeleteAllModalOpen(false);
		deleteAllMutation.mutate(undefined, {
			onSuccess: () => {
				dispatch(showAlert({ text: 'Все записи были удалены' }));
				setFilter('all');
			},
			onError: (err) => {
				dispatch(
					showAlert({
						type: 'danger',
						text: err.message ?? 'Не удалось удалить все записи',
					}),
				);
			},
		});
	};

	const deleteAllModalBody = (
		<Flex $direction="column" $gap={20}>
			<p>Вы точно хотите удалить все?</p>
			<Flex $gap={10} $justify="flex-end">
				<Button
					$variant="dark"
					$size="medium"
					onClick={() => setIsDeleteAllModalOpen(false)}
				>
					Отмена
				</Button>
				<Button
					$variant="primary"
					$size="medium"
					$disabled={deleteAllMutation.isPending}
					onClick={handleRemoveAllNotes}
				>
					Удалить
				</Button>
			</Flex>
		</Flex>
	);

	const handleFilterChange = (data: { selected: string }) => {
		const key = FILTER_ITEMS.find(
			(filterItem) => filterItem.title === data.selected,
		)?.id;
		if (!key) return;
		setFilter(key as NotesFilter);
	};

	return currentUser.name ? (
		<motion.div initial="hidden" animate="visible">
			<NoteForm />
			{isLoading && <NonNotes variants={item}>Загрузка...</NonNotes>}
			{!isLoading && hasAnyNotes && (
				<TopBlock
					variants={item}
					$gap={10}
					$columns={'1fr 200px'}
					$direction="column"
				>
					<NoteTitle>
						Список задач
						<Button
							$size="medium"
							onClick={() => setIsDeleteAllModalOpen(true)}
							$disabled={deleteAllMutation.isPending}
						>
							удалить все {trashIcon}
						</Button>
					</NoteTitle>
					<Select
						list={FILTER_ITEMS}
						placeholder="Все"
						onChange={handleFilterChange}
					/>
				</TopBlock>
			)}
			{!isLoading && !hasFilteredNotes && (
				<NonNotes variants={item}>
					{hasAnyNotes
						? 'Нет задач для выбранного фильтра'
						: 'Нет записей'}
				</NonNotes>
			)}
			<List variants={item}>
				<AnimatePresence mode="popLayout">
					{!isLoading &&
						hasAnyNotes &&
						filteredNotes.map((note, idx) => {
							const { _optimisticId } = note;

							return (
								<NoteStyled
									key={_optimisticId ?? note.id}
									{...noteMotion(idx)}
									$completed={note.completed}
									$deleting={deletingId === note.id}
									layout
								>
									<NoteItemContent
										id={note.id}
										title={note.title}
										date={note.date}
										completed={note.completed}
										onToggle={handleToggle}
										onDelete={handleDelete}
									/>
								</NoteStyled>
							);
						})}
				</AnimatePresence>
			</List>
			<Modal
				open={isDeleteAllModalOpen}
				onClose={() => setIsDeleteAllModalOpen(false)}
				title="Удаление всех записей"
				body={deleteAllModalBody}
			/>
		</motion.div>
	) : (
		<AlertParagraph variants={item} transition={{ duration: 1 }}>
			<div>Зайдите в свой аккаунт либо зарегистрируйте новый.</div>
		</AlertParagraph>
	);
};
