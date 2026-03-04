'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

import { Container } from '@/shared/layouts';
import { item, mainVariant } from '@/shared/lib/animations';
import { Button, Modal } from '@/shared/ui';

import { H1 } from './styled';

export const ModalPage = () => {
	const [isOpen, setIsOpen] = useState(false);

	const handleOpenModal = () => {
		setIsOpen(true);
	};

	const handleCloseModal = () => {
		setIsOpen(false);
	};

	const paragraph = (
		<>
			<p key="it1">
				Контент, который изменит все представление о модальных окнах.
			</p>
			<br />
		</>
	);

	return (
		<Container
			variants={mainVariant}
			initial="hidden"
			animate="visible"
			exit="exit"
		>
			<H1 variants={item}>Modal Page</H1>
			<motion.p variants={item}>
				Здесь представлен пример использования modal
			</motion.p>

			<br />

			<Button variants={item} onClick={handleOpenModal}>
				Открыть модальное окно
			</Button>

			<Modal
				open={isOpen}
				onClose={handleCloseModal}
				title="Заголовок модального окна в две строки"
				body={paragraph}
			/>
		</Container>
	);
};
