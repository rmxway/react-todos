import { motion, type Variants } from 'framer-motion';
import styled, { css } from 'styled-components';

export interface ButtonProps {
	$variant?: 'primary' | 'danger' | 'light' | 'dark' | 'noBorder';
	$size?: 'small' | 'medium' | 'large';
	$disabled?: boolean;
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
	padding: 14px;
	font-size: 14px;
	outline: none;
	opacity: 0.7;
	background-color: transparent;
	cursor: pointer;

	&:focus {
		outline: none;
	}

	${({ theme, $variant, $size, $disabled }) => css`
		border: 2px solid ${theme.textColor};
		border-radius: ${theme.radius.border};
		color: ${theme.textColor};
		${$variant === 'primary' &&
		css`
			background-color: ${theme.primary};
			border-color: ${theme.primary};
			color: white;
			opacity: 1;
		`}
		${$variant === 'danger' &&
		css`
			background-color: ${theme.colors.danger};
			border-color: ${theme.colors.danger};
			color: white;
			opacity: 1;
		`}

		${$variant === 'noBorder' &&
		css`
			border: none;
		`}
		
		// Если необходимо независимо от темы выбрать темный или светлый цвет
		${($variant === 'light' || $variant === 'dark') &&
		css`
			border-color: ${$variant === 'light'
				? theme.colors.light
				: theme.colors.dark};
			color: ${$variant === 'light'
				? theme.colors.light
				: theme.colors.dark};
			opacity: 1;
		`}
		
		${$size === 'small' &&
		css`
			padding: 5px 10px;
			font-size: 14px;
		`}
		${$size === 'large' &&
		css`
			padding: 20px 30px;
			font-size: 18px;
		`}
		${$disabled &&
		css`
			pointer-events: none;
			opacity: 0.2;
		`}
	`}
`;
