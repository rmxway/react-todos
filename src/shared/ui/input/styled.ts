import { motion } from 'framer-motion';
import { darken } from 'polished';
import styled, { css } from 'styled-components';

export const InputWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

export const Label = styled.label`
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

export const StyledInput = styled(motion.input)<{ $error?: boolean }>`
	padding: 15px;
	border-radius: 4px;
	width: 100%;
	box-sizing: border-box;

	&,
	&:focus {
		outline: none;
	}

	${({ theme, $error }) => css`
		background-color: ${darken(0.02, theme.bg)};
		border: 1px solid ${theme.borderColor};
		transition: ${theme.transitions.default};
		color: ${theme.textColor};
		&:focus {
			border-color: ${$error ? theme.colors.danger : theme.primary};
		}
		${$error &&
		css`
			&,
			&:focus {
				border-color: ${theme.colors.danger};
			}
		`}
	`}
`;

export const HelperText = styled.span`
	font-size: 12px;
	margin-top: 5px;
	opacity: 0.7;
	color: ${(props) => props.theme.textColor};
`;
