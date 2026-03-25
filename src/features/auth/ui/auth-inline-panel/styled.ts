import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

export const PanelOuter = styled(motion.div)`
	width: 100%;
	min-width: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const FormColumn = styled.div`
	width: 100%;
	max-width: min(300px, 100%);
	min-width: 0;
	margin: 0 auto;
`;

export const SwitchRow = styled.div`
	${({ theme }) => css`
		margin-top: 20px;
		text-align: center;
		font-size: 0.95rem;
		color: ${theme.colors.silver};
	`}
`;

export const SwitchButton = styled.button`
	${({ theme }) => css`
		margin: 0;
		padding: 0;
		border: none;
		background: none;
		cursor: pointer;
		font: inherit;
		color: ${theme.primary};
		text-decoration: underline;
		text-underline-offset: 3px;

		&:hover {
			opacity: 0.85;
		}
	`}
`;
