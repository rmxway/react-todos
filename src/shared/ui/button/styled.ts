import { motion, type Variants } from 'framer-motion';
import styled, { css } from 'styled-components';

export interface ButtonProps {
	variant?: 'primary' | 'secondary' | 'danger' | 'light';
	size?: 'small' | 'medium' | 'large';
	disabled?: boolean;
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	type?: 'button' | 'submit' | 'reset';
	children?: React.ReactNode;
	className?: string;
	variants?: Variants;
}

export const StyledButton = styled(motion.button).attrs(() => ({
	whileHover: { scale: 1.02 },
	whileTap: { scale: 0.95 },
	transition: { duration: 0.2 },
}))<ButtonProps>`
	font-family: 'Roboto Condensed', sans-serif;
	border: 2px solid ${(props) => props.theme.textColor};
	color: ${(props) => props.theme.textColor};
	border-radius: 5px;
	padding: 15px;
	outline: none;
	opacity: 0.7;
	background-color: transparent;
	cursor: pointer;

	&:focus {
		outline: none;
	}

	${(props) =>
		props.variant === 'primary' &&
		css`
			background-color: ${props.theme.primary};
			border-color: ${props.theme.primary};
			color: white;
			opacity: 1;
		`}

	${(props) =>
		props.variant === 'danger' &&
		css`
			background-color: ${props.theme.colors.danger};
			border-color: ${props.theme.colors.danger};
			color: white;
			opacity: 1;
		`}

	${(props) =>
		props.variant === 'light' &&
		css`
			border-color: #fff;
			color: #fff;
			opacity: 1;
		`}

	${(props) =>
		props.size === 'small' &&
		css`
			padding: 5px 10px;
			font-size: 14px;
		`}

	${(props) =>
		props.size === 'large' &&
		css`
			padding: 20px 30px;
			font-size: 18px;
		`}

	${(props) =>
		props.disabled &&
		css`
			pointer-events: none;
			opacity: 0.2;
		`}
`;
