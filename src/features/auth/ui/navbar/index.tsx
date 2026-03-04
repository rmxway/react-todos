import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';

import logo from '@/assets/logo.png';
import { UserMenu } from '@/features/auth/ui/user-menu';
import { Container } from '@/shared/layouts';
import {
	menuLineBottom,
	menuLineCenter,
	menuLineTop,
	mobileMenuVar,
	navLiVarinats,
	navVariants,
} from '@/shared/lib/animations';
import { Button } from '@/shared/ui';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { hideAlert } from '@/store/slices/alertSlice';
import { changeTheme } from '@/store/slices/appSlice';

import { MenuButton, MobileMenu, Nav } from './styled';

const links = [
	{ path: '/', title: 'Notes' },
	{ path: '/modal', title: 'Modal' },
	{ path: '/select', title: 'Select' },
	{ path: '/motion', title: 'Motion' },
];

export const Navbar = () => {
	const pathname = usePathname();
	const linkIndex = links.findIndex((l) => l.path === pathname);
	const selected = linkIndex >= 0 ? linkIndex : 0;
	const [menuOpened, setMenuOpened] = useState(false);
	const color = useAppSelector((state) => state.app.color);
	const ulRef = useRef<HTMLUListElement>(null);
	const mobileMenuRef = useRef<HTMLDivElement>(null);
	const visibleAlert = useAppSelector((state) => state.alert.visible);
	const dispatch = useAppDispatch();

	const toggleColor = () => {
		const newColor = color === 'light' ? 'dark' : 'light';
		localStorage.setItem('color', newColor);
		document.cookie = `color=${newColor}; path=/; max-age=31536000`;
		dispatch(changeTheme(newColor));
	};

	const handleClick = () => {
		window.scrollTo(0, 0);
		if (visibleAlert) {
			dispatch(hideAlert());
		}
		setMenuOpened(false);
	};

	const handleClickMobileMenu = () => {
		setMenuOpened(!menuOpened);
	};

	return (
		<Nav>
			<Container>
				<Image
					src={logo}
					alt=""
					className="logo"
					width={40}
					height={40}
					priority
				/>

				<MenuButton
					animate={menuOpened ? 'opened' : 'initial'}
					onClick={handleClickMobileMenu}
				>
					<motion.span
						variants={menuLineTop}
						transition={{ duration: 1, type: 'spring' as const }}
					/>
					<motion.span
						variants={menuLineCenter}
						transition={{ duration: 1, type: 'spring' as const }}
					/>
					<motion.span
						variants={menuLineBottom}
						transition={{ duration: 1, type: 'spring' as const }}
					/>
				</MenuButton>

				<AnimatePresence mode="wait">
					{menuOpened && (
						<MobileMenu
							ref={mobileMenuRef}
							variants={mobileMenuVar}
							initial="hidden"
							animate={menuOpened ? 'visible' : 'hidden'}
							exit="hidden"
						>
							<ul className="mobile-menu">
								{links.map((item, idx) => (
									<li
										key={item.title}
										onClick={() => handleClick()}
									>
										<Link
											href={item.path}
											className={
												pathname === item.path
													? 'active'
													: ''
											}
											data-id={idx}
										>
											{item.title}
										</Link>
									</li>
								))}
							</ul>
						</MobileMenu>
					)}
				</AnimatePresence>

				<Button $variant="light" $size="small" onClick={toggleColor}>
					{color === 'light' ? 'Светлая' : 'Темная'} тема
				</Button>

				<LayoutGroup id="navbar-desktop">
					<motion.ul
						ref={ulRef}
						className="desktop-menu"
						variants={navVariants}
						initial="hidden"
						animate="visible"
					>
						{links.map((item, idx) => (
							<motion.li
								variants={navLiVarinats}
								onClick={() => handleClick()}
								key={item.title}
							>
								<Link
									href={item.path}
									className={
										pathname === item.path ? 'active' : ''
									}
									data-id={idx}
								>
									{item.title}
								</Link>

								{idx === selected && (
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{
											duration: 0.2,
											type: 'spring',
											stiffness: 100,
											mass: 0.4,
										}}
										layoutId="underline"
										className="underline"
									/>
								)}
							</motion.li>
						))}
					</motion.ul>
				</LayoutGroup>

				<UserMenu />
			</Container>
		</Nav>
	);
};
