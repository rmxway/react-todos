import { motion } from 'framer-motion';
import styled from 'styled-components';

import { breakpoints } from '@/shared/config';
import { StyledGrid } from '@/shared/layouts/grid/styled';
import { SelectSC } from '@/shared/ui/select/styled';

export const NonNotes = styled(motion.p)`
	position: absolute;
`;

export const NoteTitle = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 20px;
	flex-grow: 1;
`;

export const List = styled(motion.ul)`
	position: relative;
	margin: 0;
	padding: 0;
`;

export const AlertParagraph = styled(motion.div)`
	width: 100%;
	margin-top: 100px;
	text-align: center;
	font-size: 20px;
	font-weight: 100;
	letter-spacing: 2px;
`;

export const TopBlock = styled(StyledGrid)`
	position: relative;
	margin-bottom: 20px;

	${SelectSC} {
		max-width: 280px;
		margin: 0;
	}

	${breakpoints.lessThan('sm')`
		grid-auto-flow: row!important;
		grid-template-columns: 1fr;

		${SelectSC} {
			max-width: 100%;			
		}
	`}
`;
