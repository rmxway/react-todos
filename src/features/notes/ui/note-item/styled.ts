import { motion } from 'framer-motion';
import { darken, lighten } from 'polished';
import styled, { css } from 'styled-components';

import { Button } from '@/shared/ui';

export const NoteStyled = styled(motion.li)<{ $completed?: boolean }>`
	list-style: none;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-right: 10px;
	transition-property: background-color, opacity;
	transition-duration: 0.3s;
	border-top: none;

	${({ theme, $completed }) => css`
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
		${$completed &&
		css`
			opacity: 0.5;
			strong,
			small {
				text-decoration: line-through;
			}
		`}
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
	padding: 5px;
	width: 30px;
	margin-right: 0;
`;
