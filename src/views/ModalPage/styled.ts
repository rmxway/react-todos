import { motion } from 'framer-motion';
import styled from 'styled-components';

export const H1 = styled(motion.h1)`
	font-family: 'Roboto Condensed', sans-serif;
	font-weight: 100;
	font-size: 35px;
	color: ${(props) => props.theme.primary};
	transition: ${(props) => props.theme.transitions.default};
`;
