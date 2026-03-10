import { motion } from 'framer-motion';
import { darken, lighten } from 'polished';
import styled, { css } from 'styled-components';

import { Button } from '@/shared/ui';

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
	transition-property: background-color;
	transition-duration: 0.3s;
	border-top: none;
	min-width: 0;

	${({ theme, $completed, $deleting }) => css`
		color: ${theme.textColor};
		background-color: ${darken(0.05, theme.bg)};
		border: 1px solid ${theme.borderColor};
		&:first-child {
			border-radius: 4px 4px 0 0;
			border-top: 1px solid ${theme.borderColor};
		}
		&:last-child {
			border-radius: 0 0 4px 4px;
		}

		&:after {
			position: absolute;
			content: '';
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: ${theme.primary};
			pointer-events: none;
			z-index: 0;
			opacity: 0;
			transition: opacity 0.2s;
		}

		${$completed &&
		css`
			&:after {
				opacity: 0.15;
			}
		`}

		${$deleting &&
		css`
			opacity: 0.5 !important;
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
		}

		.note-text span,
		.note-text small {
			flex-shrink: 0;
		}
	`}
`;

export const NoteNumber = styled.div<{ theme: { currentTheme?: string } }>`
	display: inline-block;
	text-align: center;
	font-size: 14px;
	font-weight: 400;
	color: white;
	width: 35px;
	height: 45px;
	letter-spacing: 0;
	line-height: 50px;
	margin: 0 20px 0 0;
	background-color: ${(props) => props.theme.colors.silver};

	${(props) =>
		props.theme.currentTheme === 'light' &&
		css`
			background-color: ${lighten(0.3, props.theme.colors.silver)};
		`}
`;

export const CloseButton = styled(Button)`
	font-size: 1.2rem;
	min-width: 30px;
	margin-right: 0;
	line-height: 15px;
	padding: 5px;
`;
