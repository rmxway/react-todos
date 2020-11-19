import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { changeTheme, hideAlert } from 'scripts/store/actions';

import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import styled from 'styled-components';
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
import { breakpoints } from 'styles/sc/media';
import { darken } from 'polished';

// Styles ------------------------------------------

export const Nav = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: ${(props) => props.theme.z.menu};
    background-color: ${(props) => props.theme.primary};
    padding: 10px 0;
    box-shadow: 0 5px 30px #fff4;
    transition: ${(props) => props.theme.transitions.default};

    ${Container} {
        width: auto;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    img {
        height: 35px;
        max-height: 100%;
        max-width: 100%;
        margin-right: 20px;
    }

    .desktop-menu {
        margin: 0;
        padding: 0;
        list-style: none;
        display: flex;
        flex-grow: 1;

        ${breakpoints.lessThan('sm')`
            display: none;
        `}

        li {
            position: relative;
            display: block;
            margin: 0;
            margin: 0 15px;

            a {
                display: block;
                color: #fff;
                font-weight: 600;
                opacity: 0.6;
                transition: 0.2s;
                height: 100%;
                padding: 5px 0 8px;
                text-decoration: none;

                &.active {
                    opacity: 1;
                }

                &:hover {
                    text-decoration: none;
                }
            }

            .underline {
                width: 100%;
                height: 3px;
                border-radius: 4px;
                background: #fff;
                position: absolute;
                bottom: 0px;
            }
        }
    }
`;

const MenuButton = styled(motion.button)`
    display: none;

    width: 35px;
    height: 22px;
    background: none;
    border: none;
    outline: none;
    cursor: pointer;

    span {
        display: inline-block;
        height: 2px;
        width: 100%;
        border-radius: 5px;
        background-color: white;
    }

    ${breakpoints.lessThan('sm')`
        display: flex;        
        flex-direction: column;
        justify-content: space-between;
        margin-right: auto;
    `}
`;

const MobileMenu = styled(motion.div)`
    flex-grow: 1;
    position: absolute;
    background-color: ${({ theme }) => darken(0.05, theme.bg)};
    top: 45px;
    box-shadow: 0 10px 10px #0004;
    left: 10px;
    right: 10px;
    padding: 20px;
    z-index: 100;

    .mobile-menu {
        list-style: none;
        margin: 0;
        padding: 0;
        font-size: 16px;

        li {
            margin: 10px 0;
        }

        a {
            text-decoration: none;
            color: ${({ theme }) => theme.textColor};

            &.active {
                border-bottom: 2px solid white;
            }
        }
    }
`;

// Component ---------------------------------------

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
