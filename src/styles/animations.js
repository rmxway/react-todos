export const alertMotion = {
    initial: { opacity: 0, top: -100 },
    animate: { opacity: 1, top: 15 },
    exit: { opacity: 0, top: 0 },
    transition: {
        duration: 0.2,
        type: 'spring',
        mass: 0.5,
    },
};

export const noteMotion = {
    initial: { x: -200, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { opacity: 0, scaleY: 0 },
    transition: {
        duration: 0.6,
        type: 'spring',
        stiffness: 150,
        damping: 20,
    },
};

// Variants

export const mainVariant = {
    hidden: {
        opacity: 0,
        y: 10,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            staggerChildren: 0.1,
        },
    },
    exit: {
        y: 10,
        opacity: 0,
    },
};

export const notesVariant = {
    hidden: { y: 30, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.4,
            staggerChildren: 0.1,
        },
    },
};

export const item = {
    hidden: { y: 30, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.4,
        },
    },
};

//---------------------------------

export const navVariants = {
    hidden: {
        opacity: 0,
        x: -10,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.4,
            staggerChildren: 0.1,
        },
    },
};

export const navLiVarinats = {
    hidden: {
        opacity: 0,
        x: -30,
    },

    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: 'spring',
            stiffness: 200,
            mass: 0.5,
            duration: 0.2,
        },
    },
};

//---------------------------------

export const selectDropdownVariants = {
    close: {
        opacity: 0,
    },
    open: {
        left: 0,
        opacity: 1,
        transition: {
            type: 'tween',
            duration: 0.2,
            staggerChildren: 0.05,
        },
    },
    exit: {
        opacity: 0,
        transition: {
            type: 'tween',
            duration: 0.15,
        },
    },
};

export const selectLiVariants = {
    close: {
        x: -5,
        opacity: 0,
    },
    open: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.1,
        },
    },
};
