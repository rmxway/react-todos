'use client';

import { AnimatePresence } from 'framer-motion';
import { lazy, Suspense } from 'react';

import { fadein } from '@/shared/lib/animations';

import { Link, PopupBackplane, Wrapper } from './styled';

const LoginForm = lazy(() =>
	import('@/features/auth/ui/login-form').then((m) => ({
		default: m.LoginForm,
	})),
);
const RegistrationForm = lazy(() =>
	import('@/features/auth/ui/registration-form').then((m) => ({
		default: m.RegistrationForm,
	})),
);

export interface UserMenuGuestProps {
	containerRef: React.RefObject<HTMLDivElement>;
	isOpen: boolean;
	isReg: boolean;
	onLinkClick: (event: React.MouseEvent<HTMLDivElement>) => void;
	onSubmit: (user: {
		name: string;
		login: string;
		password: string;
	}) => Promise<void>;
	onLogin: (user: { login: string; password: string }) => Promise<void>;
}

export function UserMenuGuest({
	containerRef,
	isOpen,
	isReg,
	onLinkClick,
	onSubmit,
	onLogin,
}: UserMenuGuestProps) {
	return (
		<Wrapper layout $relative>
			<div ref={containerRef}>
				<Link
					data-type="register"
					className="loglink"
					onClick={onLinkClick}
				>
					Регистрация
				</Link>
				<Link
					data-type="login"
					className="loglink"
					onClick={onLinkClick}
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
							<Suspense fallback={null}>
								{isReg ? (
									<RegistrationForm onSubmit={onSubmit} />
								) : (
									<LoginForm onSubmit={onLogin} />
								)}
							</Suspense>
						</PopupBackplane>
					)}
				</AnimatePresence>
			</div>
		</Wrapper>
	);
}
