'use client';

import { motion } from 'framer-motion';
import { useStore } from 'react-redux';

import type { AuthMode } from '@/features/auth/lib/normalizeAuthMode';
import { NotesList } from '@/features/notes';
import { Container } from '@/shared/layouts';
import { item, mainVariant } from '@/shared/lib/animations';
import type { RootState } from '@/store';
import { useAppDispatch } from '@/store/hooks';
import { setAuthFormMode } from '@/store/slices/authUiSlice';

import { Fly, H1 } from './styled';

export const NotePage = ({ authMode }: { authMode: AuthMode }) => {
	const store = useStore<RootState>();
	const dispatch = useAppDispatch();

	if (store.getState().authUi.authFormMode !== authMode) {
		dispatch(setAuthFormMode(authMode));
	}

	return (
		<Container
			variants={mainVariant}
			initial="hidden"
			animate="visible"
			exit="hidden"
		>
			<H1>React Notes</H1>
			<motion.p variants={item}>
				Создавайте заметки, фильтруйте список и отмечайте выполненные
				задачи.
			</motion.p>
			<Fly />
			<NotesList />
		</Container>
	);
};
