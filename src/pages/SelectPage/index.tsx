import { Select } from '@/components/Select';
import { item, mainVariant } from '@/styles/animations';
import { Container, Fly, H1 } from '@/styles/base';
import { SelectWrapper } from '@/styles/selectWrapper';
import { motion } from 'framer-motion';

import { useAppSelector } from '@/store/hooks';

const frameworksList = [
	{ id: '23423', title: 'React' },
	{ id: '4324232', title: 'Vue' },
	{ id: '1235432', title: 'Angular' },
	{ id: '12342342', title: 'Swift' },
];

export const SelectPage = () => {
	const { users } = useAppSelector((state) => state);
	const { currentUser } = users;

	const findUserNotes = currentUser.name
		? users.list.find((user) =>
				currentUser.name ? user.id === currentUser.id : null,
			)?.notes
		: undefined;

	const onChange = (_sel: { selected: string }) => {
		// Demo: handle selection
	};

	return (
		<Container variants={mainVariant} initial="hidden" animate="visible">
			<H1 variants={item}>Select page</H1>
			<motion.p variants={item}>Component Select</motion.p>
			<Fly />
			<SelectWrapper variants={item}>
				<Select
					list={findUserNotes?.map((n) => ({
						id: n.id,
						title: n.title,
					}))}
					onChange={onChange}
					label="Список заметок"
					placeholder="Выберите заметку"
				/>
			</SelectWrapper>
			<SelectWrapper variants={item}>
				<Select
					list={frameworksList}
					label="Модель"
					placeholder="Выберите модель"
				/>
				<Select list={frameworksList} label="Инструмент разработки" />
				<Select list={frameworksList} />
			</SelectWrapper>
		</Container>
	);
};
