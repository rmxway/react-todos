import { motion } from 'framer-motion';
import styled from 'styled-components';

export const H1 = styled(motion.h1)`
	font-family: 'Roboto Condensed', sans-serif;
	font-weight: 100;
	font-size: 35px;
	color: ${(props) => props.theme.primary};
	transition: ${(props) => props.theme.transitions.default};
`;

export const BackPlane = styled(motion.div)`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: ${(props) => props.theme.z.modal};
	background-color: #222;
`;

export const ImageComponent = styled(motion.div)`
	position: relative;
	margin: 50px 0;
	height: 400px;
	width: 100%;

	img {
		position: absolute;
		max-height: 100%;
		box-shadow: 0 5px 15px #0007;
		z-index: ${(props) => props.theme.z.modal};
	}
`;
