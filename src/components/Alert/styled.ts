import { MotionButton } from '@/styles/base';
import { motion } from 'framer-motion';
import { lighten } from 'polished';
import styled, { css } from 'styled-components';

export const AlertSC = styled(motion.div)<{ type?: string }>`
	position: fixed;
	line-height: 1;
	display: flex;
	font-size: 16px;
	justify-content: space-between;
	align-items: center;
	padding: 12px 20px;
	border-radius: 4px;
	color: ${(props) => props.theme.textColor};
	top: 50px;
	left: 0;
	right: 0;
	box-shadow: ${(props) => props.theme.shadows.alert};
	z-index: ${(props) => props.theme.z.modal};
	margin: 0 15px;

	${(props) =>
		props.type === 'danger'
			? css`
					background-color: ${lighten(
						0.08,
						props.theme.colors.danger,
					)};
				`
			: props.type === 'success'
				? css`
						background-color: ${lighten(
							0.15,
							props.theme.colors.success,
						)};
					`
				: css`
						background-color: ${lighten(
							0.1,
							props.theme.colors.warning,
						)};
						color: #333;
					`}
`;

export const Close = styled(MotionButton)`
	border: none;
	background-color: #2227;
	color: white;
	padding: 5px;
	width: 30px;
	margin-right: 0;
`;
