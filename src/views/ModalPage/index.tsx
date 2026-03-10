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
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic,
				quas earum harum et provident soluta repellat itaque, sunt
				asperiores numquam dignissimos accusamus aperiam? Provident
				repudiandae iusto quaerat facere rem incidunt optio corrupti
				temporibus, ex earum, eos pariatur adipisci ratione inventore?
				Animi sed earum illo, soluta ex ipsa beatae assumenda quod modi
				ullam perferendis iste. Iusto error, voluptates expedita sint
				quam labore hic ut, quae illum esse totam impedit! Excepturi vel
				eos, totam quibusdam dicta unde obcaecati asperiores neque
				labore maxime deserunt voluptas debitis architecto similique
				corrupti sequi officiis ab officia eum at quidem praesentium
				eius repellendus! Fuga doloremque alias minus dicta facere totam
				obcaecati ut eligendi veritatis tempora nostrum porro autem,
				aliquam perferendis commodi cumque. Consectetur amet aspernatur
				dolor iusto provident fugiat esse molestiae, facilis quis? Neque
				magnam, repudiandae enim, accusantium itaque animi debitis
				veritatis fuga sapiente in assumenda omnis, voluptatem molestias
				et laboriosam quam dignissimos tenetur id magni unde tempore
				sunt ex nihil! Reprehenderit minus sapiente porro illo,
				veritatis quaerat perferendis ad possimus ex voluptate suscipit
				in excepturi nisi iste culpa nobis soluta modi dolore
				consequatur consequuntur? Error ducimus optio sapiente dolorem,
				reprehenderit sit modi, voluptate obcaecati eaque, eius cum
				beatae in nisi consectetur doloribus officia eligendi aut nobis.
			</p>
			<br />
		</>
	);

	return (
		<Container
			variants={mainVariant}
			initial="hidden"
			animate="visible"
			exit="hidden"
		>
			<H1>Modal Page</H1>
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
