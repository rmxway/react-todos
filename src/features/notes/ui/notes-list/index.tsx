'use client';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useMemo, useState } from 'react';

import { AuthInlinePanel } from '@/features/auth/ui';
import {
	useDeleteAllNotes,
	useDeleteNote,
	useNotes,
	useToggleNote,
	useUpdateNote,
} from '@/features/notes/api/hooks';
import {
	filterNotes,
	type NotesFilter,
	type NotesSortBy,
} from '@/features/notes/lib/filterNotes';
import { NoteForm } from '@/features/notes/ui/note-form';
import { NoteItemContent, NoteStyled } from '@/features/notes/ui/note-item';
import { Flex } from '@/shared/layouts';
import { item, noteMotion } from '@/shared/lib/animations';
import { Button, Input, Modal, Select, type SelectItem } from '@/shared/ui';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { showAlert } from '@/store/slices/alertSlice';

import {
	List,
	NonNotes,
	NotesStats,
	NoteTitle,
	SkeletonCheckbox,
	SkeletonItem,
	SkeletonList,
	SkeletonText,
	TopBlock,
} from './styled';

const FILTER_ITEMS: SelectItem[] = [
	{ id: 'all', title: 'Все' },
	{ id: 'active', title: 'Незавершенные' },
	{ id: 'completed', title: 'Завершенные' },
];

const SORT_ITEMS: SelectItem[] = [
	{ id: 'date', title: 'По дате' },
	{ id: 'title', title: 'По названию' },
	{ id: 'status', title: 'По статусу' },
];

export const NotesList = () => {
	const { currentUser } = useAppSelector((state) => state.users);
	const isLoggedIn = !!currentUser?.name;
	const { data: notes = [], isLoading } = useNotes(isLoggedIn);
	const toggleMutation = useToggleNote();
	const deleteMutation = useDeleteNote();
	const deleteAllMutation = useDeleteAllNotes();
	const updateMutation = useUpdateNote();

	const dispatch = useAppDispatch();
	const [filter, setFilter] = useState<NotesFilter>('all');
	const [searchQuery, setSearchQuery] = useState('');
	const [sortBy, setSortBy] = useState<NotesSortBy>('date');

	const filteredNotes = useMemo(
		() => filterNotes({ notes, filter, searchQuery, sortBy }),
		[notes, filter, searchQuery, sortBy],
	);

	const hasAnyNotes = notes.length > 0;
	const hasFilteredNotes = filteredNotes.length > 0;
	const trashIcon = <FontAwesomeIcon icon={faTrash} />;
	const [deletingIds, setDeletingIds] = useState<Set<string>>(
		() => new Set(),
	);
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
			setDeletingIds((prev) => new Set(prev).add(id));

			deleteMutation.mutate(id, {
				onSuccess: () => {
					setDeletingIds((prev) => {
						const next = new Set(prev);
						next.delete(id);
						return next;
					});
					dispatch(showAlert({ text: 'Запись удалена' }));
				},
				onError: (err) => {
					setDeletingIds((prev) => {
						const next = new Set(prev);
						next.delete(id);
						return next;
					});
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

	const handleFilterChange = (data: {
		selected: string;
		selectedId: string | number;
	}) => {
		setFilter(data.selectedId as NotesFilter);
	};

	const handleSortChange = (data: {
		selected: string;
		selectedId: string | number;
	}) => {
		setSortBy(data.selectedId as NotesSortBy);
	};

	const handleUpdateTitle = useCallback(
		(id: string, title: string) => {
			if (id.startsWith('temp-')) return;
			updateMutation.mutate(
				{ id, title },
				{
					onSuccess: () => {
						dispatch(showAlert({ text: 'Заметка обновлена' }));
					},
					onError: (err) => {
						dispatch(
							showAlert({
								type: 'danger',
								text: err.message ?? 'Ошибка при обновлении',
							}),
						);
					},
				},
			);
		},
		[updateMutation, dispatch],
	);

	return currentUser.name ? (
		<motion.div initial="hidden" animate="visible">
			<NoteForm />
			{isLoading && (
				<SkeletonList variants={item}>
					{[1, 2, 3, 4, 5].map((i) => (
						<SkeletonItem key={i}>
							<SkeletonCheckbox />
							<SkeletonText />
						</SkeletonItem>
					))}
				</SkeletonList>
			)}
			{!isLoading && hasAnyNotes && (
				<>
					<TopBlock
						variants={item}
						$gap={10}
						$columns={'175px 1fr 130px 300px'}
						$direction="column"
					>
						<Input
							type="text"
							placeholder="Поиск..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
						<span />
						<Button
							$size="medium"
							onClick={() => setIsDeleteAllModalOpen(true)}
							$disabled={deleteAllMutation.isPending}
						>
							удалить все {trashIcon}
						</Button>
						<Flex $gap={10} $align="center">
							<Select
								list={FILTER_ITEMS}
								placeholder="Все"
								onChange={handleFilterChange}
							/>
							<Select
								list={SORT_ITEMS}
								placeholder="По дате"
								onChange={handleSortChange}
							/>
						</Flex>
					</TopBlock>
					<NoteTitle variants={item}>
						<span>Список задач</span>
						<NotesStats>
							Выполнено {notes.filter((n) => n.completed).length}{' '}
							из {notes.length}
						</NotesStats>
					</NoteTitle>
				</>
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
									$deleting={deletingIds.has(note.id)}
									layout
								>
									<NoteItemContent
										id={note.id}
										title={note.title}
										date={note.date}
										completed={note.completed}
										onToggle={handleToggle}
										onDelete={handleDelete}
										onUpdateTitle={handleUpdateTitle}
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
		<AuthInlinePanel />
	);
};
