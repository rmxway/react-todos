import { motion } from 'framer-motion';
import { darken, lighten } from 'polished';
import styled, { css } from 'styled-components';

export const Link = styled(motion.div)`
	position: relative;
	display: inline-block;
	color: #fff;
	font-weight: 300;
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
	margin: 0 10px;
	color: white;
	padding: 5px 20px;
	background-color: ${(props) => darken(0.03, props.theme.primary)};
	box-shadow: inset 0 -10px 20px #2226;
	border-radius: 30px;
	font-weight: 300;
	max-width: 250px;
	max-height: 40px;
	overflow: hidden;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	word-break: break-word;
	line-height: 1;

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

export const Wrapper = styled(motion.div)<{ $relative?: boolean }>`
	${({ $relative }) =>
		$relative &&
		css`
			position: relative;
			margin-left: auto;
			flex-shrink: 1;
			font-size: 0.9rem;
			min-width: 0;
			display: flex;
			flex-wrap: nowrap;
			align-items: center;
		`}
`;
