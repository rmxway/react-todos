import { motion } from 'framer-motion';
import { darken, lighten } from 'polished';
import styled from 'styled-components';

export const Link = styled(motion.div)`
	position: relative;
	display: inline-block;
	color: #fff;
	font-weight: 600;
	transition: 0.2s;
	height: 100%;
	padding: 5px 0;
	margin-left: 15px;
	cursor: pointer;

	&:after {
		position: absolute;
		content: '';
		bottom: -20px;
		left: 45%;
		width: 10px;
		height: 10px;
		z-index: -10;
		background-color: ${(props) => lighten(0.05, props.theme.bg)};
		transform: rotate(45deg);
		transition: 0.3s;
		opacity: 0;
	}

	&.active {
		&:after {
			opacity: 1;
		}
	}
`;

export const User = styled.div`
	display: inline-block;
	margin: 0 10px;
	color: white;
	padding: 5px 20px;
	background-color: ${(props) => darken(0.03, props.theme.primary)};
	box-shadow: inset 0 -10px 27px #2226;
	border-radius: 30px;
	font-weight: 600;
	span {
		font-weight: 100;
	}
`;

export const PopupBackplane = styled(motion.div)`
	position: absolute;
	top: 40px;
	right: 0;
	width: 300px;
	z-index: 0;
	padding: 20px;
	border-radius: 0 0 10px 10px;
	background-color: ${(props) => lighten(0.05, props.theme.bg)};
	box-shadow: ${(props) => props.theme.shadows.popup};
	transition: 0.2s;
`;

export const Wrapper = styled(motion.div)<{ relative?: boolean }>`
	${(props) => props.relative && 'position: relative;'}
`;
