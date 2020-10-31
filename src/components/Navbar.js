import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { motion, AnimateSharedLayout } from 'framer-motion';
import { MotionButton, Nav } from '../styled';
import { changeTheme, hideAlert } from '../store/actions';

export const Navbar = ({ updateTheme }) => {
    const [selected, setSelected] = useState(0);
    const dispatch = useDispatch();
    const links = [
        {
            path: '/',
            title: 'Notes',
        },
        {
            path: '/motion',
            title: 'Motion',
        },
    ];

    const [color, setColor] = useState(useSelector((state) => state.app.color));

    const toggleColor = () => {
        const newColor = color === 'light' ? 'dark' : 'light';
        setColor(newColor);
        localStorage.setItem('color', newColor);
        dispatch(changeTheme(newColor));
        updateTheme(newColor);
    };

    const handleClick = (idx) => {
        setSelected(idx);
        dispatch(hideAlert());
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
                    <ul>
                        {links.map((item, idx) => (
                            <motion.li
                                animate
                                onClick={() => handleClick(idx)}
                                key={idx}
                            >
                                <NavLink
                                    exact
                                    to={item.path}
                                    activeClassName="active"
                                >
                                    {item.title}
                                </NavLink>
                                {idx === selected && (
                                    <motion.div
                                        transition={{
                                            duration: 0.2,
                                            type: 'spring',
                                            stiffness: 500,
                                            damping: 30,
                                        }}
                                        layoutId="underline"
                                        className="underline"
                                    />
                                )}
                            </motion.li>
                        ))}
                    </ul>
                </AnimateSharedLayout>
            </div>
        </Nav>
    );
};
