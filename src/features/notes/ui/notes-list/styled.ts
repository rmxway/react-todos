import { motion } from 'framer-motion';
import styled from 'styled-components';

export const NonNotes = styled(motion.p)`
	position: absolute;
`;

export const NoteTitle = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 0 10px 2px;
	font-size: 20px;

	button {
		margin-right: 0;
		font-size: 14px;
		padding: 10px;
	}
`;

export const List = styled(motion.ul)`
	margin: 0;
	padding: 0;
`;

export const AlertParagraph = styled(motion.div)`
	width: 100%;
	margin-top: 100px;
	text-align: center;
	font-size: 20px;
	font-weight: 100;
	letter-spacing: 2px;
`;
