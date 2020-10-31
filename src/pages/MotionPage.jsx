import React, { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useWidth } from '../hooks';
import { Backplane, H1, ImageComponent } from '../styled';
import img from '../img/motion.png';
import { item, mainVariant } from '../animations';

export const MotionPage = () => {
    const moveX = useSpring(0, { stiffness: 1500, damping: 150 });
    const scale = useTransform(moveX, [-300, 0], [1.4, 1]);
    const opacity = useTransform(moveX, [-400, 0], [1, 0]);
    const up = useTransform(moveX, [-300, 0], [-30, 0]);
    const down = useTransform(moveX, [-300, 0], [30, 0]);
    const [move, setMove] = useState(false);

    const componentRef = useRef();
    const imageRef = useRef();
    const widthComponent = useWidth(componentRef.current);
    const widthImage = useWidth(imageRef.current);

    const handleReturnImage = () => {
        moveX.stop();
        moveX.set(0);
    };

    useEffect(() => {
        moveX.onChange(() => {
            moveX.get() < 0 ? setMove(true) : setMove(false);
        });
    }, [moveX]);

    return (
        <motion.div
            className="container"
            variants={mainVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <Backplane
                initial={{ opacity: 0 }}
                style={{ opacity, display: move ? 'block' : 'none' }}
                onClick={() => handleReturnImage()}
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
                    src={img}
                    alt="img"
                    ref={imageRef}
                    variants={item}
                    style={{
                        x: moveX,
                        scale,
                    }}
                    drag="x"
                    dragConstraints={{
                        left: -widthImage + widthComponent - 400,
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
        </motion.div>
    );
};
