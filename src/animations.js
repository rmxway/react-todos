export const alertMotion = {
    initial: { opacity: 0, top: 50 },
    animate: { opacity: 1, top: 60 },
    exit: { opacity: 0, top: 50 },
    transition: { duration: 0.2 },
};

export const noteMotion = {
    initial: { x: -200, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { opacity: 0, scaleY: 0 },
    transition: {
        duration: 0.6,
        ease: 'easeInOut',
        type: 'spring',
        stiffness: 150,
        damping: 20,
    },
};
