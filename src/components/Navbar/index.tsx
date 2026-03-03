import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

import logo from '@/assets/logo.png';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { hideAlert } from '@/store/slices/alertSlice';
import { changeTheme } from '@/store/slices/appSlice';
import {
	menuLineBottom,
	menuLineCenter,
	menuLineTop,
	mobileMenuVar,
	navLiVarinats,
	navVariants,
	transitionLines,
} from '@/styles/animations';
import { Container, MotionButton } from '@/styles/base';

import { LoginUser } from './LoginUser';
import { MenuButton, MobileMenu, Nav } from './styled';

interface NavbarProps {
	updateTheme: () => void;
}

export const Navbar = ({ updateTheme }: NavbarProps) => {
	const [selected, setSelected] = useState(0);
	const [menuOpened, setMenuOpened] = useState(false);
	const color = useAppSelector((state) => state.app.color);
	const ulRef = useRef<HTMLUListElement>(null);
	const mobileMenuRef = useRef<HTMLDivElement>(null);
	const visibleAlert = useAppSelector((state) => state.alert.visible);
	const dispatch = useAppDispatch();

	const links = [
		{ path: '/', title: 'Notes' },
		{ path: '/modal', title: 'Modal' },
		{ path: '/select', title: 'Select' },
		{ path: '/motion', title: 'Motion' },
	];

	useEffect(() => {
		const active = ulRef.current?.querySelector('.active');
		if (active) {
			const { id } = (active as HTMLElement).dataset;
			// eslint-disable-next-line react-hooks/set-state-in-effect -- sync selected tab from DOM on mount
			if (id) setSelected(+id);
		}
	}, []);

	const toggleColor = () => {
		const newColor = color === 'light' ? 'dark' : 'light';
		localStorage.setItem('color', newColor);
		dispatch(changeTheme(newColor));
		updateTheme();
	};

	const handleClick = (idx: number) => {
		setSelected(idx);
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
				<img className="logo" src={logo} alt="" />

				<MenuButton
					animate={menuOpened ? 'opened' : 'initial'}
					onClick={handleClickMobileMenu}
				>
					<motion.span
						variants={menuLineTop}
						transition={transitionLines}
					/>
					<motion.span
						variants={menuLineCenter}
						transition={transitionLines}
					/>
					<motion.span
						variants={menuLineBottom}
						transition={transitionLines}
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
										onClick={() => handleClick(idx)}
									>
										<NavLink
											end
											to={item.path}
											className={({ isActive }) =>
												isActive ? 'active' : ''
											}
											data-id={idx}
										>
											{item.title}
										</NavLink>
									</li>
								))}
							</ul>
						</MobileMenu>
					)}
				</AnimatePresence>

				<MotionButton inNav onClick={toggleColor}>
					{color === 'light' ? 'Светлая' : 'Темная'} тема
				</MotionButton>

				<AnimateSharedLayout>
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
								onClick={() => handleClick(idx)}
								key={item.title}
							>
								<NavLink
									end
									to={item.path}
									className={({ isActive }) =>
										isActive ? 'active' : ''
									}
									data-id={idx}
								>
									{item.title}
								</NavLink>

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
				</AnimateSharedLayout>

				<LoginUser />
			</Container>
		</Nav>
	);
};
