import { Notes } from '@/components/Notes';
import { item, mainVariant } from '@/styles/animations';
import { Container, Fly, H1 } from '@/styles/base';
import { motion } from 'framer-motion';

export const NotePage = () => {
	return (
		<>
			<Container
				variants={mainVariant}
				initial="hidden"
				animate="visible"
				exit="exit"
			>
				<H1>React Notes App</H1>
				<motion.p variants={item}>TodoList, Animations</motion.p>
				<Fly />
				<Notes />
			</Container>
		</>
	);
};
