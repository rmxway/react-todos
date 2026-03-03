import { motion } from 'framer-motion';
import { darken } from 'polished';
import styled, { css } from 'styled-components';

import { breakpoints } from './media';

export const H1 = styled(motion.h1)`
	font-family: 'Roboto Condensed', sans-serif;
	font-weight: 100;
	font-size: 35px;
	color: ${(props) => props.theme.primary};
	transition: ${(props) => props.theme.transitions.default};
`;

export const Fly = styled.div`
	height: 40px;
`;

export const FlexBlock = styled(motion.div)`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const Input = styled(motion.input)<{ $error?: boolean }>`
	padding: 15px;
	background-color: ${(props) => darken(0.02, props.theme.bg)};
	border-radius: 4px;
	border: 1px solid ${(props) => props.theme.borderColor};
	width: 100%;
	box-sizing: border-box;
	margin-bottom: 15px;
	transition: ${(props) => props.theme.transitions.default};

	&,
	&:focus {
		outline: none;
		color: ${(props) => props.theme.textColor};
	}

	&:focus {
		border-color: ${(props) => props.theme.primary};
	}

	${(props) =>
		props.$error &&
		css`
			&,
			&:focus {
				border-color: ${props.theme.colors.danger};
			}
		`}
`;

export const Div = styled(motion.div)<{
	comment?: boolean;
	relative?: boolean;
}>`
	${(props) =>
		props.comment &&
		css`
			margin-top: 20px;
			color: ${props.theme.colors.silver};
		`}

	${(props) =>
		props.relative &&
		css`
			position: relative;
		`}
`;

export const MotionButton = styled(motion.button).attrs(() => ({
	whileHover: { scale: 1.02 },
	whileTap: { scale: 0.95 },
	transition: { duration: 0.2 },
}))<{ inNav?: boolean; disabled?: boolean }>`
	font-family: 'Roboto Condensed', sans-serif;
	border: 2px solid ${(props) => props.theme.textColor};
	color: ${(props) => props.theme.textColor};
	border-radius: 5px;
	padding: 15px;
	margin-right: 15px;
	outline: none;
	opacity: 0.7;
	background-color: transparent;
	cursor: pointer;

	&:focus {
		outline: none;
	}

	${(props) =>
		props.inNav &&
		css`
			color: white;
			border-color: white;
			opacity: 1;
			padding: 5px 10px;
		`}

	${(props) =>
		props.disabled &&
		css`
			pointer-events: none;
			opacity: 0.2;
		`}
`;

export const Backplane = styled(motion.div)`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: ${(props) => props.theme.z.modal};
	background-color: #222;
`;

export const Container = styled(motion.section)`
	position: relative;
	margin: 0 auto;
	padding: 0 15px;
	width: 100%;
	${breakpoints.greaterThan('lg')`
        max-width: 1330px;
    `}
	${breakpoints.lessThan('lg')`
        max-width: 1030px;
    `}
    ${breakpoints.lessThan('md')`
        max-width: 100%;
    `}
`;
