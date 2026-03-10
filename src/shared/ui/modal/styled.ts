import { motion } from 'framer-motion';
import { transparentize } from 'polished';
import styled, { css } from 'styled-components';

export const ModalWrapper = styled(motion.section)`
	position: fixed;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	padding: 20px 15px;
	overflow-x: hidden;
	overflow-y: auto;
	-webkit-overflow-scrolling: touch;
	background-color: ${transparentize(0.4, '#000')};
	z-index: ${(props) => props.theme.z.modal};
`;

export const ModalWindow = styled(motion.div)<{ $width?: string }>`
	position: relative;
	width: 100%;
	min-height: 100px;
	color: #222;
	background-color: #fff;
	margin: auto 0;
	overflow: hidden;
	border: 2px solid #000000bb;
	${({ theme, $width }) => css`
		max-width: ${$width ?? '300px'};
		box-shadow: ${theme.shadows.modal};
		border-radius: ${theme.radius.border};
	`}
`;

export const ModalTitle = styled.div`
	font-size: 20px;
	letter-spacing: 0.1px;
	font-weight: 600;
	line-height: 1;
	padding: 20px 30px 20px 20px;
	background-color: #ddd;
	border-bottom: 1px solid #ccc;
`;

export const ModalBody = styled.div`
	padding: 20px;
`;

export const Close = styled.div`
	position: absolute;
	right: 12px;
	top: 12px;
	width: 20px;
	height: 20px;
	font-size: 30px;
	line-height: 0.5;
	cursor: pointer;
	transition: 0.2s;
	opacity: 0.7;

	&:hover {
		opacity: 1;
	}
`;
