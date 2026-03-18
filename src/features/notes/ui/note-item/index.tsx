import { memo, useCallback, useState } from 'react';

import { Flex } from '@/shared/layouts';
import { Checkbox } from '@/shared/ui';

import { CloseButton } from './styled';

export { NoteStyled } from './styled';

export interface NoteItemContentProps {
	id: string;
	title: string;
	date: string;
	completed: boolean;
	onToggle: (id: string) => void;
	onDelete: (id: string) => void;
	onUpdateTitle?: (id: string, title: string) => void;
}

export const NoteItemContent = memo(
	({
		id,
		title,
		date,
		completed,
		onToggle,
		onDelete,
		onUpdateTitle,
	}: NoteItemContentProps) => {
		const [isEditing, setIsEditing] = useState(false);
		const [editValue, setEditValue] = useState(title);

		const handleSave = useCallback(() => {
			const trimmed = editValue.trim();
			if (trimmed && trimmed !== title && onUpdateTitle) {
				onUpdateTitle(id, trimmed);
			}
			setIsEditing(false);
		}, [editValue, id, onUpdateTitle, title]);

		const handleCancel = useCallback(() => {
			setIsEditing(false);
		}, []);

		const handleKeyDown = useCallback(
			(e: React.KeyboardEvent) => {
				if (e.key === 'Enter') {
					e.preventDefault();
					handleSave();
				} else if (e.key === 'Escape') {
					handleCancel();
				}
			},
			[handleSave, handleCancel],
		);

		return (
			<>
				<Flex
					className="note-content"
					$justify="flex-start"
					$align="center"
				>
					<Checkbox
						checked={completed}
						onChange={() => onToggle(id)}
					/>
					<div className="note-text">
						{isEditing ? (
							<input
								className="note-title-edit"
								value={editValue}
								onChange={(e) => setEditValue(e.target.value)}
								onBlur={handleSave}
								onKeyDown={handleKeyDown}
								autoFocus
								data-testid="note-edit-input"
							/>
						) : (
							<span
								className="note-title"
								onClick={() =>
									onUpdateTitle && setIsEditing(true)
								}
								role="button"
								tabIndex={0}
								onKeyDown={(e) => {
									if (
										(e.key === 'Enter' || e.key === ' ') &&
										onUpdateTitle
									) {
										e.preventDefault();
										setIsEditing(true);
									}
								}}
							>
								{title}
							</span>
						)}
						<span>&nbsp;–&nbsp;</span>
						<small>{date}</small>
					</div>
				</Flex>
				<CloseButton type="button" onClick={() => onDelete(id)}>
					&times;
				</CloseButton>
			</>
		);
	},
);
