import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { changeTheme, hideAlert } from 'scripts/store/actions';

import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import { Nav, MenuButton, MobileMenu } from 'components/navbar/styledNavbar';
import { Container, MotionButton } from 'styles/sc/base';
import {
    navVariants,
    navLiVarinats,
    menuLineTop,
    menuLineBottom,
    menuLineCenter,
    transitionLines,
    mobileMenuVar,
} from 'styles/animations';
import { LoginUser } from './LoginUser';

export const Navbar = ({ updateTheme }) => {
    const [selected, setSelected] = useState(0);
    const [menuOpened, setMenuOpened] = useState(false);
    const color = useSelector((state) => state.app.color);
    const ulRef = useRef();
    const mobileMenuRef = useRef();
    const visibleAlert = useSelector((state) => state.alert.visible);
    const dispatch = useDispatch();
    const links = [
        {
            path: '/',
            title: 'Notes',
        },
        {
            path: '/modal',
            title: 'Modal',
        },
        {
            path: '/select',
            title: 'Select',
        },
        {
            path: '/motion',
            title: 'Motion',
        },
    ];

    useEffect(() => {
        const id = ulRef.current.querySelector('.active').dataset.id;
        setSelected(+id);
    }, []);

    const toggleColor = () => {
        const newColor = color === 'light' ? 'dark' : 'light';
        localStorage.setItem('color', newColor);
        dispatch(changeTheme(newColor));
        updateTheme();
    };

    const handleClick = (idx) => {
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
                <img src="img/logo.png" alt="" />

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

                {/* Mobile menu */}
                <AnimatePresence exitBeforeEnter>
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
                                            exact
                                            to={item.path}
                                            activeClassName="active"
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

                {/* Переключение цвета темы */}
                <MotionButton inNav onClick={toggleColor}>
                    {color === 'light' ? 'Светлая' : 'Темная'} тема
                </MotionButton>

                {/* Desktop menu */}
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
                                    exact
                                    to={item.path}
                                    activeClassName="active"
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

                {/* Регистрация, вход */}
                <LoginUser />
            </Container>
        </Nav>
    );
};
