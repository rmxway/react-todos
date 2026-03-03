import { motion } from 'framer-motion';
import styled from 'styled-components';

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
