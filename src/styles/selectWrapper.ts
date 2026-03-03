import { motion } from 'framer-motion';
import styled from 'styled-components';

import { breakpoints } from './media';

export const SelectWrapper = styled(motion.section)`
	margin: 0 -10px;
	display: flex;
	flex-wrap: nowrap;

	${breakpoints.lessThan('sm')`
        flex-wrap: wrap;
    `}
`;
