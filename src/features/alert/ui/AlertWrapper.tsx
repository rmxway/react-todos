import { useEffect } from 'react';

import { Container } from '@/shared/layouts';
import { Alert } from '@/shared/ui';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { hideAlert } from '@/store/slices/alertSlice';

export const AlertWrapper = () => {
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
		<Container>
			<Alert
				{...{ visible, type, text }}
				onClose={() => dispatch(hideAlert())}
			/>
		</Container>
	);
};
