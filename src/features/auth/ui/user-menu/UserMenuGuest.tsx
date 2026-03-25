'use client';

import { NavGuestLink, Wrapper } from './styled';

export function UserMenuGuest() {
	return (
		<Wrapper layout $relative>
			<NavGuestLink href="/?auth=register" scroll={false}>
				Регистрация
			</NavGuestLink>
			<NavGuestLink href="/?auth=login" scroll={false}>
				Войти
			</NavGuestLink>
		</Wrapper>
	);
}
