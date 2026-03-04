import { signIn, signOut } from 'next-auth/react';

import { useAppDispatch } from '@/store/hooks';
import { showAlert } from '@/store/slices/alertSlice';
import { setCurrentUser, setNotes } from '@/store/slices/usersSlice';

import { fetchTodos } from './api';

export function clearUserAndNotes(dispatch: ReturnType<typeof useAppDispatch>) {
	dispatch(setCurrentUser({}));
	dispatch(setNotes([]));
}

export async function syncUserAndTodos(
	dispatch: ReturnType<typeof useAppDispatch>,
	userId: string,
	name: string,
	email: string,
) {
	dispatch(setCurrentUser({ id: userId, name, login: email }));
	const todos = await fetchTodos();
	dispatch(setNotes(todos));
}

export function useUserMenuHandlers(
	dispatch: ReturnType<typeof useAppDispatch>,
) {
	const handleSubmit = async (user: {
		name: string;
		login: string;
		password: string;
	}) => {
		const email = user.login.trim().toLowerCase();
		const res = await fetch('/api/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email,
				password: user.password,
				name: user.name.trim(),
			}),
		});
		const data = await res.json();

		if (!res.ok) {
			dispatch(
				showAlert({
					type: 'danger',
					text: data?.error ?? 'Ошибка регистрации',
				}),
			);
			return;
		}

		const signInResult = await signIn('credentials', {
			redirect: false,
			email,
			password: user.password,
		});

		if (signInResult?.error) {
			dispatch(
				showAlert({
					type: 'danger',
					text: signInResult.error,
				}),
			);
			return;
		}

		return true;
	};

	const handleLogin = async (user: { login: string; password: string }) => {
		const email = user.login.trim().toLowerCase();
		const result = await signIn('credentials', {
			redirect: false,
			email,
			password: user.password,
		});

		if (result?.error) {
			dispatch(
				showAlert({
					type: 'danger',
					text: result.error,
				}),
			);
			return;
		}

		return true;
	};

	const handleLogout = () => {
		signOut({ redirect: false });
		dispatch(setCurrentUser({}));
		dispatch(setNotes([]));
	};

	return { handleSubmit, handleLogin, handleLogout };
}
