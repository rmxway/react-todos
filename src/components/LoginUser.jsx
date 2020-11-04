import React, { useState } from 'react';
import ClickOutHandler from 'react-onclickout';

import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { darken } from 'polished';
import { RegistrationForm } from './RegistrationForm';
import { mainVariant } from '../styles/animations';

export const LoginUser = () => {
    const Link = styled(motion.div)`
        display: inline-block;
        color: #fff;
        font-weight: 600;
        transition: 0.2s;
        height: 100%;
        padding: 5px 0;
        margin-left: 30px;
        cursor: pointer;
    `;
    const User = styled.div``;
    const PopupBackplane = styled(motion.div)`
        position: absolute;
        top: 45px;
        right: 0;
        width: 300px;
        z-index: 0;
        padding: 10px 20px;
        border-radius: 0 0 5px 5px;
        background-color: ${(props) => darken(0.05, props.theme.bg)};
        box-shadow: ${(props) => props.theme.shadows.popup};

        &:after {
            position: absolute;
            content: '';
            top: -5px;
            right: 45%;
            width: 10px;
            height: 10px;
            z-index: -10;
            background-color: ${(props) => darken(0.05, props.theme.bg)};
            transform: rotate(45deg);
        }
    `;
    const [logged, setLogged] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = (type) => {
        setIsOpen(!isOpen);
    };

    const outsideClick = () => {
        isOpen && handleClick();
    };

    return !logged ? (
        <motion.div>
            <Link onClick={() => handleClick('register')}>Регистрация</Link>
            <Link onClick={() => handleClick('login')}>Войти</Link>
            <AnimatePresence>
                {isOpen && (
                    <ClickOutHandler onClickOut={outsideClick}>
                        <PopupBackplane
                            variants={mainVariant}
                            initial="hidden"
                            animate={isOpen ? 'visible' : 'hidden'}
                            exit="exit"
                        >
                            <RegistrationForm />
                        </PopupBackplane>
                    </ClickOutHandler>
                )}
            </AnimatePresence>
        </motion.div>
    ) : (
        <motion.div>
            <User>user: Evgeny</User>
            <Link>Выйти</Link>
        </motion.div>
    );
};
