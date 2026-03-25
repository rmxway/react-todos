'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

import type { AuthMode } from '@/features/auth/lib/normalizeAuthMode';
import { item } from '@/shared/lib/animations';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setAuthFormMode } from '@/store/slices/authUiSlice';

import { LoginForm } from '../login-form';
import { RegistrationForm } from '../registration-form';
import { useUserMenuHandlers } from '../user-menu/handlers';
import { FormColumn, PanelOuter, SwitchButton, SwitchRow } from './styled';

export function AuthInlinePanel() {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const authMode = useAppSelector((s) => s.authUi.authFormMode);
	const { handleSubmit, handleLogin } = useUserMenuHandlers(dispatch);

	const go = (mode: AuthMode) => {
		dispatch(setAuthFormMode(mode));
		router.replace(
			mode === 'register' ? '/?auth=register' : '/?auth=login',
		);
	};

	const onLogin = async (user: { login: string; password: string }) => {
		const ok = await handleLogin(user);
		if (ok) router.replace('/');
	};

	const onRegister = async (user: {
		name: string;
		login: string;
		password: string;
	}) => {
		const ok = await handleSubmit(user);
		if (ok) router.replace('/');
	};

	return (
		<PanelOuter variants={item} transition={{ duration: 0.35 }}>
			<FormColumn>
				{authMode === 'register' ? (
					<motion.div key="register" variants={item}>
						<RegistrationForm onSubmit={onRegister} />
						<SwitchRow>
							Есть аккаунт?{' '}
							<SwitchButton
								type="button"
								onClick={() => go('login')}
							>
								Войти
							</SwitchButton>
						</SwitchRow>
					</motion.div>
				) : (
					<motion.div key="login" variants={item}>
						<LoginForm onSubmit={onLogin} />
						<SwitchRow>
							Нет аккаунта?{' '}
							<SwitchButton
								type="button"
								onClick={() => go('register')}
							>
								Зарегистрироваться
							</SwitchButton>
						</SwitchRow>
					</motion.div>
				)}
			</FormColumn>
		</PanelOuter>
	);
}
