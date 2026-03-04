'use client';

import { motion } from 'framer-motion';

import { Container } from '@/shared/layouts';
import { item, mainVariant } from '@/shared/lib/animations';
import { Select } from '@/shared/ui';
import { useAppSelector } from '@/store/hooks';

import { Fly, H1, SelectWrapper } from './styled';

const frameworksList = [
	{ id: '23423', title: 'React' },
	{ id: '4324232', title: 'Vue' },
	{ id: '1235432', title: 'Angular' },
	{ id: '12342342', title: 'Swift' },
];

export const SelectPage = () => {
	const users = useAppSelector((state) => state.users);
	const { notes } = users;

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
					list={notes.map((n) => ({
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
