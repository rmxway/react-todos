import { motion } from 'framer-motion';
import { darken } from 'polished';
import styled, { css } from 'styled-components';

import { breakpoints } from '@/shared/config';
import { StyledGrid } from '@/shared/layouts/grid/styled';
import { SelectSC } from '@/shared/ui/select/styled';
import { SkeletonBase } from '@/shared/ui/skeleton';

export const NonNotes = styled(motion.p)`
	position: absolute;
`;

export const NoteTitle = styled(motion.div)`
	display: flex;
	align-items: center;
	line-height: 1;
	gap: 20px;
	font-size: 20px;
	margin: 20px 0;
`;

export const NotesStats = styled.span`
	font-size: 14px;
	opacity: 0.8;
`;

export const List = styled(motion.ul)`
	position: relative;
	margin: 0;
	padding: 0;
`;

export const SkeletonItem = styled.li`
	${({ theme }) => css`
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 10px;
		min-height: 50px;
		margin-bottom: -1px;
		border: 1px solid ${theme.borderColor};
		background-color: ${darken(0.05, theme.bg)};
		list-style: none;

		&:first-child {
			border-radius: ${theme.radius.border} ${theme.radius.border} 0 0;
			border-top: 1px solid ${theme.borderColor};
		}
		&:last-child {
			border-radius: 0 0 ${theme.radius.border} ${theme.radius.border};
		}
	`}
`;

export const SkeletonCheckbox = styled(SkeletonBase)`
	width: 20px;
	height: 20px;
	flex-shrink: 0;
	border-radius: 50px;
`;

export const SkeletonText = styled(SkeletonBase)`
	flex: 1;
	height: 16px;
`;

export const SkeletonList = styled(motion.ul)`
	position: relative;
	margin: 0;
	padding: 0;
`;

export const TopBlock = styled(StyledGrid)`
	position: relative;
	margin-top: 40px;

	${SelectSC} {
		max-width: 260px;
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
