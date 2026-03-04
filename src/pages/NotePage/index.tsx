import { motion } from 'framer-motion';

import { NotesList } from '@/features/notes';
import { Container } from '@/shared/layouts';
import { item, mainVariant } from '@/shared/lib/animations';

import { Fly, H1 } from './styled';

export const NotePage = () => {
	return (
		<Container
			variants={mainVariant}
			initial="hidden"
			animate="visible"
			exit="exit"
		>
			<H1>React Notes App</H1>
			<motion.p variants={item}>TodoList, Animations</motion.p>
			<Fly />
			<NotesList />
		</Container>
	);
};
