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
	background-color: ${(props) => darken(0.02, props.theme.bg)};
	border-radius: 4px;
	border: 1px solid ${(props) => props.theme.borderColor};
	width: 100%;
	box-sizing: border-box;
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

export const HelperText = styled.span`
	font-size: 12px;
	margin-top: 5px;
	opacity: 0.7;
	color: ${(props) => props.theme.textColor};
`;
