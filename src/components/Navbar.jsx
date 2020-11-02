import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { motion, AnimateSharedLayout } from 'framer-motion';
import { MotionButton, Nav } from '../styled';
import { changeTheme, hideAlert } from '../store/actions';
import { navVariants, navLiVarinats } from '../animations';

export const Navbar = ({ updateTheme }) => {
    const [selected, setSelected] = useState(0);
    const [color, setColor] = useState(useSelector((state) => state.app.color));
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
        setColor(newColor);
        localStorage.setItem('color', newColor);
        dispatch(changeTheme(newColor));
        updateTheme(newColor);
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
