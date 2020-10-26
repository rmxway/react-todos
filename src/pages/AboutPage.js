import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Backplane, H1, ImageComponent } from '../styled';
import img from '../img/motion.png';

export const useWidth = (element) => {
    const [width, setWidth] = useState(element?.clientWidth);

    useEffect(() => {
        setWidth(element?.clientWidth);

        const resizeHandler = () => setWidth(element?.clientWidth);
        window.addEventListener('resize', resizeHandler);

        return () => window.removeEventListener('resize', resizeHandler);
    }, [element]);

    return width;
};

export const AboutPage = () => {
    //const springConfig = { type: 'spring', damping: 12, stiffness: 80 };
    const moveX = useMotionValue(0);

    //const moveX = useSpring(0, springConfig);
    const scale = useTransform(moveX, [-300, 0], [1.4, 1]);
    const opacity = useTransform(moveX, [-400, 0], [0.9, 0]);
    const up = useTransform(moveX, [-300, 0], [-30, 0]);
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
        <Fragment>
            <div className="container">
                <motion.div style={{ position: 'relative', top: up }}>
                    <H1>About page</H1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Eveniet aspernatur sunt non accusamus numquam. Similique
                        quod odit sed quasi harum, fugit nostrum perferendis,
                        illo, cupiditate id omnis? Excepturi, nisi facilis.
                    </p>
                </motion.div>
                <ImageComponent ref={componentRef}>
                    <motion.img
                        style={{ x: moveX, scale }}
                        //animate={{ transition: springConfig, x: -1000 }}
                        drag="x"
                        dragConstraints={{
                            left: -widthImage + widthComponent - 400,
                            right: 0,
                        }}
                        ref={imageRef}
                        src={img}
                    />
                    <Backplane
                        initial={{ opacity: 0 }}
                        style={{ opacity, display: move ? 'block' : 'none' }}
                        onClick={() => handleReturnImage()}
                    />
                </ImageComponent>
            </div>
        </Fragment>
    );
};
