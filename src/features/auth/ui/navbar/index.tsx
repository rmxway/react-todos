import { UserMenu } from '@/features/auth/ui/user-menu';
import { Navbar as BaseNavbar } from '@/shared/ui';

export const Navbar = () => {
	return <BaseNavbar rightSlot={<UserMenu />} />;
};
