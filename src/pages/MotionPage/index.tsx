import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

import motionImg from '@/assets/motion.png';
import { Container } from '@/shared/layouts';
import { item, mainVariant } from '@/shared/lib/animations';
import { useWidth } from '@/shared/lib/hooks';

import { BackPlane, H1, ImageComponent } from './styled';

export const MotionPage = () => {
	const moveX = useMotionValue(0);
	const scale = useTransform(moveX, [-300, 0], [1.4, 1]);
	const opacity = useTransform(moveX, [-400, 0], [1, 0]);
	const up = useTransform(moveX, [-300, 0], [-30, 0]);
	const down = useTransform(moveX, [-300, 0], [30, 0]);
	const [move, setMove] = useState(false);

	const [componentRef, widthComponent] = useWidth();
	const [imageRef, widthImage] = useWidth();
	const widthC = widthComponent ?? 0;
	const widthI = widthImage ?? 0;

	const handleReturnImage = () => {
		moveX.stop();
		moveX.set(0);
	};

	useEffect(() => {
		const unsubscribe = moveX.onChange((latest) => {
			setMove(latest < 0);
		});
		return unsubscribe;
	}, [moveX]);

	return (
		<Container
			variants={mainVariant}
			initial="hidden"
			animate="visible"
			exit="exit"
		>
			<BackPlane
				initial={{ opacity: 0 }}
				style={{
					opacity,
					display: move ? 'block' : 'none',
					zIndex: move ? 1000 : 'auto',
				}}
				onClick={handleReturnImage}
			/>
			<motion.div style={{ position: 'relative', top: up }}>
				<H1 variants={item}>Motion page</H1>
				<motion.p variants={item}>
					Здесь представлен пример использования motion анимации,
					основанной на drag событии.
				</motion.p>
			</motion.div>
			<ImageComponent ref={componentRef}>
				<motion.img
					src={motionImg}
					alt="img"
					ref={imageRef}
					variants={item}
					style={{
						x: moveX,
						scale,
						zIndex: move ? 1001 : 'auto',
					}}
					drag="x"
					dragConstraints={{
						left: -widthI + widthC - 400,
						right: 0,
					}}
				/>
			</ImageComponent>

			<motion.div
				variants={item}
				style={{ position: 'relative', top: down }}
			>
				Lorem ipsum dolor sit amet consectetur, adipisicing elit.
				Aspernatur porro deleniti cupiditate minus eaque voluptate iure
				nostrum praesentium molestiae aliquam. Magnam iste aspernatur
				corrupti neque quibusdam nihil ratione earum quos.
			</motion.div>
		</Container>
	);
};
