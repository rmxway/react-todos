import { Modal } from '@/components/Modal';
import { item, mainVariant } from '@/styles/animations';
import { Container, H1, MotionButton } from '@/styles/base';
import { motion } from 'framer-motion';
import { useState } from 'react';

export const ModalPage = () => {
	const [isOpen, setIsOpen] = useState(false);

	const handleOpenModal = () => {
		setIsOpen(true);
	};

	const handleCloseModal = () => {
		setIsOpen(false);
	};

	const paragraph = (
		<p key="it1">
			Суперский контент, который изменит все представление о модальных
			окнах.
		</p>
	);

	const closeButton = (
		<MotionButton key="it2" onClick={handleCloseModal}>
			Закрыть
		</MotionButton>
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

			<MotionButton variants={item} onClick={handleOpenModal}>
				Открыть модальное окно
			</MotionButton>

			<Modal
				open={isOpen}
				onClose={handleCloseModal}
				title="Заголовок модального окна в две строки"
				body={[paragraph, closeButton]}
			/>
		</Container>
	);
};
