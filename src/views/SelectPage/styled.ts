import { motion } from 'framer-motion';
import styled from 'styled-components';

import { breakpoints } from '@/shared/config';

export const H1 = styled(motion.h1)`
	font-family: 'Roboto Condensed', sans-serif;
	font-weight: 100;
	font-size: 35px;
	color: ${(props) => props.theme.primary};
	transition: ${(props) => props.theme.transitions.default};
`;

export const Fly = styled.div`
	height: 40px;
`;

export const SelectWrapper = styled(motion.div)`
	display: flex;
	flex-wrap: nowrap;
	margin: 0 -10px;
	width: 100%;

	${breakpoints.lessThan('sm')`
		flex-direction: column;
		flex-wrap: wrap;
	`}
`;
