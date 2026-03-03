import { fadein } from '@/styles/animations';
import { MotionButton } from '@/styles/base';
import { motion } from 'framer-motion';
import styled from 'styled-components';

export const FormBlock = styled(motion.form)`
	max-width: 400px;

	${MotionButton} {
		width: 100%;
		margin-top: 10px;
	}
`;

export const stringPattern = /^[а-яА-ЯёЁ a-zA-Z]+$/;

export const Label = styled(motion.label)`
	font-family: 'Roboto Condensed', sans-serif;
	letter-spacing: 1px;
	position: relative;
	display: block;
	left: 2px;
	margin-bottom: 5px;
	font-size: 10px;
	opacity: 0.7;
	text-transform: uppercase;
`;

export const ErrorForm = styled(motion.div).attrs(() => ({
	variants: fadein,
	initial: 'hidden',
	animate: 'visible',
	exit: 'exit',
}))`
	color: ${(props) => props.theme.colors.danger};

	margin: -10px 0 10px;
	font-size: 11px;
`;
