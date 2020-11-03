import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { changeTheme, hideAlert } from '../store/actions';

import { motion, AnimateSharedLayout } from 'framer-motion';
import styled from 'styled-components';
import { MotionButton } from '../styles/sc/base';
import { navVariants, navLiVarinats } from '../styles/animations';

export const Nav = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: ${(props) => props.theme.z.menu};
    background-color: ${(props) => props.theme.primary};
    padding: 10px;
    margin-bottom: 20px;
    box-shadow: 0 5px 30px #fff4;
    transition: ${(props) => props.theme.transitions.default};

    .container {
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

    ul {
        margin: 0;
        padding: 0;
        list-style: none;
        display: flex;

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
                padding: 5px 0;

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

export const Navbar = ({ updateTheme }) => {
    const [selected, setSelected] = useState(0);
    const color = useSelector((state) => state.app.color);
    const ulRef = useRef();
    const visibleAlert = useSelector((state) => state.alert.visible);
    const dispatch = useDispatch();
    const links = [
        {
            path: '/',
            title: 'Notes',
        },
        {
            path: '/select',
            title: 'Select',
        },
        {
            path: './registration',
            title: 'Registration',
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
    };
    return (
        <Nav>
            <div className="container">
                <img src="img/logo.png" alt="" />
                {/* Переключение цвета темы */}
                <MotionButton onClick={toggleColor}>
                    {color === 'light' ? 'Светлая' : 'Темная'} тема
                </MotionButton>
                <AnimateSharedLayout>
                    <motion.ul
                        ref={ulRef}
                        variants={navVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {links.map((item, idx) => (
                            <motion.li
                                variants={navLiVarinats}
                                onClick={() => handleClick(idx)}
                                key={idx}
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
            </div>
        </Nav>
    );
};
