'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';

import {
	clearUserAndNotes,
	syncUserAndTodos,
	useUserMenuHandlers,
} from './handlers';
import { UserMenuAuth } from './UserMenuAuth';
import { UserMenuGuest } from './UserMenuGuest';

export const UserMenu = () => {
	const { data: session, status } = useSession();
	const dispatch = useAppDispatch();
	const users = useAppSelector((state) => state.users);

	const logged = status === 'authenticated' && !!session?.user;
	const { handleLogout } = useUserMenuHandlers(dispatch);

	useEffect(() => {
		if (!session?.user?.id) {
			clearUserAndNotes(dispatch);
			return;
		}
		syncUserAndTodos(
			dispatch,
			session.user.id,
			session.user.name ?? '',
			session.user.email ?? '',
		);
	}, [
		session?.user?.id,
		session?.user?.email,
		session?.user?.name,
		dispatch,
	]);

	if (status === 'loading') {
		return null;
	}

	if (logged) {
		return (
			<UserMenuAuth
				userName={users.currentUser.name ?? session?.user?.name ?? ''}
				onLogout={handleLogout}
			/>
		);
	}

	return <UserMenuGuest />;
};
