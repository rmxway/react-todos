import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';

import logo from '@/assets/logo.png';
import { Container } from '@/shared/layouts';
import {
	menuLineBottom,
	menuLineCenter,
	menuLinesTransition,
	menuLineTop,
	mobileMenuVar,
	navLiVarinats,
	navVariants,
} from '@/shared/lib/animations';
import { Button, MoonIcon, SunIcon } from '@/shared/ui';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { hideAlert } from '@/store/slices/alertSlice';
import { changeTheme } from '@/store/slices/appSlice';

import { MenuButton, MobileMenu, Nav } from './styled';

const links = [
	{ path: '/', title: 'Notes' },
	{ path: '/modal', title: 'Modal' },
	{ path: '/select', title: 'Select' },
];

interface NavbarProps {
	rightSlot?: React.ReactNode;
}

export const Navbar = ({ rightSlot }: NavbarProps) => {
	const pathname = usePathname();
	const linkIndex = links.findIndex((l) => l.path === pathname);
	const selected = linkIndex >= 0 ? linkIndex : 0;
	const [menuOpened, setMenuOpened] = useState(false);
	const color = useAppSelector((state) => state.app.color);
	const isDark = color === 'dark';
	const themeToggleLabel = isDark
		? 'Включить светлую тему'
		: 'Включить тёмную тему';
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
						transition={menuLinesTransition}
					/>
					<motion.span
						variants={menuLineCenter}
						transition={menuLinesTransition}
					/>
					<motion.span
						variants={menuLineBottom}
						transition={menuLinesTransition}
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

				<Button
					$variant="noBorder"
					$size="small"
					onClick={toggleColor}
					aria-label={themeToggleLabel}
				>
					{isDark ? (
						<SunIcon color="light" />
					) : (
						<MoonIcon color="light" />
					)}
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

				{rightSlot}
			</Container>
		</Nav>
	);
};
