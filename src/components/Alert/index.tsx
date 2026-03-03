import { alertMotion } from '@/styles/animations';
import { Container } from '@/styles/base';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { hideAlert } from '@/store/slices/alertSlice';

import { AlertSC, Close } from './styled';

export const Alert = () => {
	const { visible, type, text } = useAppSelector((state) => state.alert);
	const dispatch = useAppDispatch();

	useEffect(() => {
		let timeout: ReturnType<typeof setTimeout>;
		if (visible) {
			timeout = setTimeout(() => {
				dispatch(hideAlert());
			}, 3300);
		}
		return () => clearTimeout(timeout);
	}, [visible, dispatch]);

	return (
		<AnimatePresence initial={false}>
			{visible && (
				<Container>
					<AlertSC type={type} layout {...alertMotion}>
						{text}
						<Close
							type="button"
							className="close"
							onClick={() => dispatch(hideAlert())}
						>
							<span>&times;</span>
						</Close>
					</AlertSC>
				</Container>
			)}
		</AnimatePresence>
	);
};
