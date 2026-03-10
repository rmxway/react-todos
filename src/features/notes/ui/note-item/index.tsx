import { forwardRef, memo } from 'react';

import { Flex } from '@/shared/layouts';
import { noteMotion } from '@/shared/lib/animations';
import { Checkbox } from '@/shared/ui';

import { CloseButton, NoteNumber, NoteStyled } from './styled';

export interface NoteItemProps {
	id: string;
	title: string;
	date: string;
	completed: boolean;
	index: number;
	staggerDelay?: number;
	isDeleting?: boolean;
	onToggle: (id: string) => void;
	onDelete: (id: string) => void;
}

export const NoteItem = memo(
	forwardRef<HTMLLIElement, NoteItemProps>(
		(
			{
				id,
				title,
				date,
				completed,
				index,
				staggerDelay = 0,
				isDeleting = false,
				onToggle,
				onDelete,
			},
			ref,
		) => (
			<NoteStyled
				ref={ref}
				{...noteMotion}
				transition={{
					delay: staggerDelay,
				}}
				$completed={completed}
				$deleting={isDeleting}
			>
				<Flex
					className="note-content"
					$justify="flex-start"
					$align="center"
				>
					<Checkbox
						checked={completed}
						onChange={() => onToggle(id)}
					/>
					<NoteNumber>{index + 1}</NoteNumber>
					<div className="note-text">
						<span className="note-title">{title}</span>
						<span>&nbsp;–&nbsp;</span>
						<small>{date}</small>
					</div>
				</Flex>
				<CloseButton type="button" onClick={() => onDelete(id)}>
					&times;
				</CloseButton>
			</NoteStyled>
		),
	),
);
