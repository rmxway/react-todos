import { MotionProps } from 'framer-motion';

export const alertMotion: MotionProps = {
	initial: { opacity: 0, top: -100 },
	animate: { opacity: 1, top: 70 },
	exit: { opacity: 0, top: 0 },
	transition: {
		duration: 0.2,
		type: 'spring' as const,
		mass: 0.5,
	},
};

export const noteMotion = (idx: number) => ({
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	exit: { opacity: 0 },
	transition: {
		duration: 0.3,
		delay: idx * 0.05,
	},
});

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
			duration: 0.3,
		},
	},
};

export const modalItem = {
	hidden: { y: 20, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: { duration: 0.2 },
	},
	exit: {
		opacity: 0,
		transition: { duration: 0.2 },
	},
};

export const fadein = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.2,
		},
	},
	exit: {
		opacity: 0,
		pointerEvents: 'none' as const,
		transition: {
			duration: 0.2,
		},
	},
};

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
			type: 'spring' as const,
			stiffness: 200,
			mass: 0.5,
			duration: 0.2,
		},
	},
};

export const menuLinesTransition = {
	type: 'tween' as const,
	duration: 0.3,
	ease: 'easeInOut' as const,
};

export const menuLineCenter = {
	initial: {
		opacity: 1,
		width: 32,
	},
	opened: {
		opacity: 0,
		width: 0,
	},
};

export const menuLineTop = {
	initial: {
		rotate: 0,
		y: 0,
		transformOrigin: 'center center',
	},
	opened: {
		rotate: 45,
		y: '0.625rem',
		transformOrigin: 'center center',
	},
};

export const menuLineBottom = {
	initial: {
		rotate: 0,
		y: 0,
		transformOrigin: 'center center',
	},
	opened: {
		rotate: -45,
		y: '-0.625rem',
		transformOrigin: 'center center',
	},
};

export const mobileMenuVar = {
	hidden: { x: '-100%', transition: { ease: 'easeIn' as const } },
	visible: {
		x: 0,
		transition: {
			duration: 0.4,
			ease: 'easeInOut' as const,
		},
	},
};

export const selectDropdownVariants = {
	close: {
		opacity: 0,
		scaleY: 0.95,
	},
	open: {
		opacity: 1,
		scaleY: 1,
		transition: {
			type: 'tween' as const,
			duration: 0.2,
			ease: 'easeOut' as const,
			staggerChildren: 0.04,
		},
	},
};

export const selectLiVariants = {
	close: {
		opacity: 0,
		y: -8,
	},
	open: {
		opacity: 1,
		y: 0,
		transition: {
			type: 'tween' as const,
			duration: 0.15,
			ease: 'easeOut' as const,
		},
	},
};
