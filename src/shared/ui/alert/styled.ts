import { motion } from 'framer-motion';
import { lighten } from 'polished';
import styled, { css } from 'styled-components';

export const AlertSC = styled(motion.div)<{ $type?: string }>`
	position: fixed;
	line-height: 1;
	display: flex;
	font-size: 16px;
	justify-content: space-between;
	align-items: center;
	padding: 12px 20px;
	border-radius: 4px;
	top: 50px;
	left: 0;
	right: 0;
	margin: 0 15px;
	${({ theme, $type }) => css`
		color: ${theme.textColor};
		box-shadow: ${theme.shadows.alert};
		z-index: ${theme.z.modal};
		${$type === 'danger' &&
		css`
			background-color: ${lighten(0.08, theme.colors.danger)};
		`}
		${$type === 'success' &&
		css`
			background-color: ${lighten(0.15, theme.colors.success)};
		`}
			${$type !== 'danger' &&
		$type !== 'success' &&
		css`
			background-color: ${lighten(0.1, theme.colors.warning)};
			color: #333;
		`}
	`}
`;

export const CloseButton = styled.button`
	border: none;
	background-color: #2227;
	color: white;
	padding: 5px;
	width: 30px;
	height: 30px;
	cursor: pointer;
	border-radius: 4px;
	font-size: 20px;
	line-height: 1;
	transition: 0.2s;

	&:hover {
		background-color: #2229;
	}
`;
