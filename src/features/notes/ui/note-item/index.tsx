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
	onToggle: (id: string) => void;
	onDelete: (id: string) => void;
}

export const NoteItem = ({
	id,
	title,
	date,
	completed,
	index,
	onToggle,
	onDelete,
}: NoteItemProps) => {
	return (
		<NoteStyled {...noteMotion} layout $completed={completed}>
			<Flex $justify="flex-start" $align="center">
				<Checkbox checked={completed} onChange={() => onToggle(id)} />
				<NoteNumber>{index + 1}</NoteNumber>
				<strong>{title}&nbsp; – &nbsp;</strong>
				<small>{date}</small>
			</Flex>
			<CloseButton type="button" onClick={() => onDelete(id)}>
				&times;
			</CloseButton>
		</NoteStyled>
	);
};
