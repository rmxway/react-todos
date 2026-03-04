'use client';

import { Link, User, Wrapper } from './styled';

export interface UserMenuAuthProps {
	userName: string;
	onLogout: () => void;
}

export function UserMenuAuth({ userName, onLogout }: UserMenuAuthProps) {
	return (
		<Wrapper layout>
			<User>{userName}</User>
			<Link onClick={onLogout}>Выйти</Link>
		</Wrapper>
	);
}
