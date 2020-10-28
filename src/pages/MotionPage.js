import React, { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useWidth } from '../hooks';
import { Backplane, H1, ImageComponent } from '../styled';
import img from '../img/motion.png';

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
        <>
            <div className="container">
                <Backplane
                    initial={{ opacity: 0 }}
                    style={{ opacity, display: move ? 'block' : 'none' }}
                    onClick={() => handleReturnImage()}
                />
                <motion.div style={{ position: 'relative', top: up }}>
                    <H1>Motion page</H1>
                    <p>
                        Здесь представлен пример использования motion анимации,
                        основанной на drag событии.
                    </p>
                </motion.div>
                <ImageComponent ref={componentRef}>
                    <motion.img
                        src={img}
                        alt="img"
                        ref={imageRef}
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

                <motion.div style={{ position: 'relative', top: down }}>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Aspernatur porro deleniti cupiditate minus eaque voluptate
                    iure nostrum praesentium molestiae aliquam. Magnam iste
                    aspernatur corrupti neque quibusdam nihil ratione earum
                    quos.
                </motion.div>
            </div>
        </>
    );
};
