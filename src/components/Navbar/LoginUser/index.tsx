import { fadein } from '@/styles/animations';
import { Div } from '@/styles/base';
import { AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';

import { useOnClickOutside } from '@/hooks';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { showAlert } from '@/store/slices/alertSlice';
import { addUser, currentUser } from '@/store/slices/usersSlice';
import type { User as UserType } from '@/types';

import { LoginForm } from '../forms/LoginForm';
import { NavbarForms } from '../forms/NavbarForms';
import { RegistrationForm } from '../forms/RegistrationForm';
import { Link, PopupBackplane, User } from './styled';

export const LoginUser = () => {
	const dispatch = useAppDispatch();
	const { users } = useAppSelector((state) => state);
	const ref = useRef<HTMLDivElement>(null);

	const [logged, setLogged] = useState(!!users.currentUser.login);
	const [isOpen, setIsOpen] = useState(false);
	const [isReg, setIsReg] = useState(false);
	const [prevLink, setPrevLink] = useState('');

	useOnClickOutside(ref, () => {
		const links = document.querySelectorAll('.loglink');
		links.forEach((link) => link.classList.remove('active'));
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
		if (type === 'register') {
			setIsReg(true);
		} else {
			setIsReg(false);
		}
		if (prevLink !== type) {
			setIsOpen(true);
		} else {
			setIsOpen(!isOpen);
		}
		setPrevLink(type ?? '');
	};

	const handleSubmit = (user: {
		name: string;
		login: string;
		password: string;
		id?: number;
	}) => {
		const id = user.id ?? Date.now();
		const userWithId = { ...user, id };
		setIsOpen(false);
		setLogged(true);
		dispatch(addUser(userWithId as UserType));
		dispatch(currentUser(userWithId));
	};

	const handleLogin = (user: { login: string; password: string }) => {
		const findUser = users.list.filter(
			(item) =>
				item.login === user.login && item.password === user.password,
		);
		if (findUser.length) {
			setIsOpen(false);
			setLogged(true);
			dispatch(currentUser(findUser[0]));
		} else {
			dispatch(
				showAlert({
					type: 'danger',
					text: 'Аккаунта не существует',
				}),
			);
		}
	};

	const handleLogout = () => {
		setLogged(false);
		dispatch(currentUser({}));
	};

	return !logged ? (
		<Div layout relative>
			<div ref={ref}>
				<Link
					data-type="register"
					className="loglink"
					onClick={handleClick}
				>
					Регистрация
				</Link>
				<Link
					data-type="login"
					className="loglink"
					onClick={handleClick}
				>
					Войти
				</Link>
				<AnimatePresence>
					{isOpen && (
						<PopupBackplane
							variants={fadein}
							initial="hidden"
							animate={isOpen ? 'visible' : 'hidden'}
							exit="exit"
						>
							<NavbarForms>
								{isReg ? (
									<RegistrationForm onSubmit={handleSubmit} />
								) : (
									<LoginForm onSubmit={handleLogin} />
								)}
							</NavbarForms>
						</PopupBackplane>
					)}
				</AnimatePresence>
			</div>
		</Div>
	) : (
		<Div layout>
			<User>{users.currentUser.name}</User>
			<Link onClick={handleLogout}>Выйти</Link>
		</Div>
	);
};
