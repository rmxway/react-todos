'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';

import { useOnClickOutside } from '@/shared/lib/hooks';
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
	const ref = useRef<HTMLDivElement>(null);

	const [isOpen, setIsOpen] = useState(false);
	const [isReg, setIsReg] = useState(false);
	const [prevLink, setPrevLink] = useState('');

	const logged = status === 'authenticated' && !!session?.user;
	const {
		handleSubmit: submitForm,
		handleLogin: loginForm,
		handleLogout,
	} = useUserMenuHandlers(dispatch);

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

	useOnClickOutside(ref, () => {
		document.querySelectorAll('.loglink').forEach((link) => {
			link.classList.remove('active');
		});
		setIsOpen(false);
	});

	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		const target = event.target as HTMLElement;
		const links = document.querySelectorAll('.loglink');
		const hasActive = target.classList.contains('active');

		links.forEach((link) => {
			if (event.target === link) {
				link.classList[hasActive ? 'remove' : 'add']('active');
			} else {
				link.classList.remove('active');
			}
		});

		const type = target.getAttribute('data-type');
		setIsReg(type === 'register');
		if (prevLink !== type) {
			setIsOpen(true);
		} else {
			setIsOpen((open) => !open);
		}
		setPrevLink(type ?? '');
	};

	const handleSubmit = async (user: {
		name: string;
		login: string;
		password: string;
	}) => {
		const success = await submitForm(user);
		if (success) setIsOpen(false);
	};

	const handleLogin = async (user: { login: string; password: string }) => {
		const success = await loginForm(user);
		if (success) setIsOpen(false);
	};

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

	return (
		<UserMenuGuest
			containerRef={ref}
			isOpen={isOpen}
			isReg={isReg}
			onLinkClick={handleClick}
			onSubmit={handleSubmit}
			onLogin={handleLogin}
		/>
	);
};
