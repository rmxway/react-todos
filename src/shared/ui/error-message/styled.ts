import { motion } from 'framer-motion';
import styled from 'styled-components';

export const StyledErrorMessage = styled(motion.div).attrs(() => ({
	variants: {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { duration: 0.2 },
		},
		exit: {
			opacity: 0,
			pointerEvents: 'none' as const,
			transition: { duration: 0.2 },
		},
	},
	initial: 'hidden',
	animate: 'visible',
	exit: 'exit',
}))`
	color: ${(props) => props.theme.colors.danger};
	margin: 5px 0 0;
	font-size: 11px;
`;
