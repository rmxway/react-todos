import { motion } from 'framer-motion';
import { darken, lighten } from 'polished';
import styled, { css } from 'styled-components';

import { noteMotion } from '@/styles/animations';
import { FlexBlock, MotionButton } from '@/styles/base';

export const NonNotes = styled(motion.p)`
	position: absolute;
`;

export const NoteTitle = styled(motion.div)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 0 10px 2px;
	font-size: 20px;

	${MotionButton} {
		margin-right: 0;
		font-size: 14px;
		padding: 10px;
	}
`;

export const List = styled(motion.ul)`
	margin: 0;
	padding: 0;

	${FlexBlock} {
		justify-content: flex-start;
		width: 100%;
	}
`;

export const AlertParagraph = styled(motion.div)`
	width: 100%;
	margin-top: 100px;
	text-align: center;
	font-size: 20px;
	font-weight: 100;
	letter-spacing: 2px;
`;

export const NoteNumber = styled(motion.div)`
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

export const Note = styled(motion.li).attrs(() => ({
	...noteMotion,
}))<{ completed?: boolean }>`
	color: ${(props) => props.theme.textColor};
	background-color: ${(props) => darken(0.05, props.theme.bg)};
	border: 1px solid ${(props) => props.theme.borderColor};
	border-top: none;
	list-style: none;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-right: 10px;
	transition-property: background-color, opacity;
	transition-duration: 0.3s;

	${({ completed }) =>
		completed &&
		css`
			opacity: 0.5;

			strong,
			small {
				text-decoration: line-through;
			}
		`}

	&:first-child {
		border-radius: 4px 4px 0 0;
		border-top: 1px solid ${(props) => props.theme.borderColor};
	}

	&:last-child {
		border-radius: 0 0 4px 4px;
	}
`;

export const Close = styled(MotionButton)`
	padding: 5px;
	width: 30px;
	margin-right: 0;
`;
