import { memo } from 'react';

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
}

export const NoteItemContent = memo(
	({
		id,
		title,
		date,
		completed,
		onToggle,
		onDelete,
	}: NoteItemContentProps) => (
		<>
			<Flex
				className="note-content"
				$justify="flex-start"
				$align="center"
			>
				<Checkbox checked={completed} onChange={() => onToggle(id)} />
				<div className="note-text">
					<span className="note-title">{title}</span>
					<span>&nbsp;–&nbsp;</span>
					<small>{date}</small>
				</div>
			</Flex>
			<CloseButton type="button" onClick={() => onDelete(id)}>
				&times;
			</CloseButton>
		</>
	),
);
