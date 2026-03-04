import { motion } from 'framer-motion';
import styled from 'styled-components';

export const FormBlock = styled(motion.form)`
	max-width: 400px;

	button {
		width: 100%;
		margin-top: 10px;
	}
`;

export const FieldWrapper = styled(motion.div)`
	margin-bottom: 15px;
`;

export const Comment = styled(motion.div)`
	margin-top: 20px;
	color: ${(props) => props.theme.colors.silver};
`;
