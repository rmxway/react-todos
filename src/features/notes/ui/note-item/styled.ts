import { motion } from 'framer-motion';
import { darken, lighten } from 'polished';
import styled, { css } from 'styled-components';

import { Button } from '@/shared/ui';

export const NoteNumber = styled.div`
	display: inline-block;
	text-align: center;
	font-size: 14px;
	font-weight: 400;
	color: #fff;
	height: 45px;
	letter-spacing: 0;
	line-height: 50px;
	margin: 0 20px 0 0;
	background-color: ${(props) => lighten(0.2, props.theme.colors.silver)};
`;

export const CloseButton = styled(Button)`
	font-size: 1.2rem;
	width: 30px;
	height: 30px;
	margin-right: 0;
	padding: 0;
`;

export const NoteStyled = styled(motion.li)<{
	$completed?: boolean;
	$deleting?: boolean;
}>`
	position: relative;
	list-style: none;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-right: 10px;
	min-height: 50px;
	border-top: none;
	min-width: 0;
	margin-bottom: -1px;

	${({ theme, $completed, $deleting }) => css`
		color: ${theme.textColor};
		background-color: ${darken(0.05, theme.bg)};
		border: 1px solid ${theme.borderColor};
		transition-property: background-color;
		transition-duration: 0.2s;

		&:first-child {
			border-radius: ${theme.radius.border} ${theme.radius.border} 0 0;
			border-top: 1px solid ${theme.borderColor};
		}
		&:last-child {
			border-radius: 0 0 ${theme.radius.border} ${theme.radius.border};
		}
		&:only-child {
			border-radius: ${theme.radius.border};
		}

		${$completed &&
		css`
			background-color: ${darken(0.1, theme.bg)};
		`}

		${$deleting &&
		css`
			background-color: ${lighten(0.01, theme.bg)};
			pointer-events: none;
		`}

		.note-content {
			flex: 1;
			min-width: 0;
			padding-right: 10px;
		}

		.note-text {
			display: flex;
			align-items: center;
			gap: 4px;
			min-width: 0;
			flex: 1;
			flex-wrap: wrap;
		}

		.note-title {
			min-width: 0;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			font-weight: 600;
			cursor: pointer;
			border-bottom: 2px dotted ${theme.borderColor};
		}

		.note-title-edit {
			flex: 1;
			min-width: 0;
			padding: 4px 8px;
			font-size: inherit;
			font-weight: 600;
			border: 1px solid ${theme.borderColor};
			border-radius: ${theme.radius.border};
			background-color: ${theme.bg};
			color: ${theme.textColor};
			outline: none;
		}

		.note-text small {
			flex-shrink: 0;
		}
	`}
`;
