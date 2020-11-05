import React, { useEffect, useState } from 'react';
import ClickOutHandler from 'react-onclickout';

import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { darken, lighten } from 'polished';
import { fadein } from 'styles/animations';

import { RegistrationForm } from 'components/navbar/forms/RegistrationForm';
import { Div } from 'styles/sc/base';
import { NavbarForms } from 'components/navbar/forms/NavbarForms';
import { LoginForm } from 'components/navbar/forms/LoginForm';
import { useDispatch, useSelector } from 'react-redux';
import { activeUser, addUser } from '../../store/actions';

const Link = styled(motion.div)`
    position: relative;
    display: inline-block;
    color: #fff;
    font-weight: 600;
    transition: 0.2s;
    height: 100%;
    padding: 5px 0;
    margin-left: 30px;
    cursor: pointer;

    &:after {
        position: absolute;
        content: '';
        bottom: -20px;
        left: 45%;
        width: 10px;
        height: 10px;
        z-index: -10;
        background-color: ${(props) => lighten(0.05, props.theme.bg)};
        transform: rotate(45deg);
        transition: 0.3s;
        opacity: 0;
    }

    &.active {
        &:after {
            opacity: 1;
        }
    }
`;
const User = styled.div`
    display: inline-block;
    margin: 0 10px;
    color: white;
    padding: 5px 20px;
    background-color: ${(props) => darken(0.03, props.theme.primary)};
    box-shadow: inset 0 -10px 27px #2226;
    border-radius: 30px;
    font-weight: 600;
    span {
        font-weight: 100;
    }
`;

const PopupBackplane = styled(motion.div)`
    position: absolute;
    top: 40px;
    right: 0;
    width: 300px;
    z-index: 0;
    padding: 20px;
    border-radius: 0 0 10px 10px;
    background-color: ${(props) => lighten(0.05, props.theme.bg)};
    box-shadow: ${(props) => props.theme.shadows.popup};
    transition: 0.2s;
`;

// -----------------------------------------------------------------

export const LoginUser = () => {
    const dispatch = useDispatch();
    const { users, currentUser } = useSelector((state) => state.app);

    const [logged, setLogged] = useState(currentUser.login); // user enter on account
    const [isOpen, setIsOpen] = useState(false); // popup login | registration
    const [isReg, setIsReg] = useState(false); // если не залогинены, на что нажали, на регистрацию или логин
    const [prevLink, setPrevLink] = useState(''); // на какую ссылку нажали последней

    const handleClick = (event) => {
        const links = document.querySelectorAll('.loglink');
        const hasActive = event.target.classList.contains('active');
        links.forEach((link) => {
            if (event.target === link) {
                link.classList[hasActive ? 'remove' : 'add']('active');
            } else {
                link.classList.remove('active');
            }
        });
        currentLink(event);
    };

    const currentLink = (event) => {
        const currentLink = event.target.attributes.type.nodeValue;
        currentLink === 'register' ? setIsReg(true) : setIsReg(false);
        if (prevLink !== currentLink) {
            setIsOpen(true);
        } else {
            setIsOpen(!isOpen);
        }
        setPrevLink(currentLink);
    };

    // Регистрация пользователя
    const handleSubmit = (user) => {
        const id = Date.now();
        Object.assign(user, { id });
        setIsOpen(!isOpen);
        setLogged(!logged);
        dispatch(addUser(user));
        dispatch(activeUser(user));
    };

    // Вход в аккаунт
    const handleLogin = (user) => {
        const findUser = users.filter(
            (item) =>
                item.login === user.login && item.password === user.password
        );
        if ({ ...findUser['login'] }) {
            setIsOpen(!isOpen);
            setLogged(!logged);
            dispatch(activeUser(...findUser));
        }
    };

    // Выход из аккаунта
    const handleLogout = () => {
        setLogged(!logged);
        dispatch(activeUser({}));
    };

    const outsideClick = (e) => {
        const links = document.querySelectorAll('.loglink');
        if (!e.target.classList.contains('loglink')) {
            setIsOpen(false);
            links.forEach((link) => link.classList.remove('active'));
        }
    };

    return !logged ? (
        <Div layout relative>
            <Link type="register" className="loglink" onClick={handleClick}>
                Registration
            </Link>
            <Link type="login" className="loglink" onClick={handleClick}>
                Login
            </Link>
            <AnimatePresence>
                {isOpen && (
                    <ClickOutHandler onClickOut={outsideClick}>
                        <PopupBackplane
                            variants={fadein}
                            initial="hidden"
                            animate={isOpen ? 'visible' : 'hidden'}
                            exit="exit"
                        >
                            <NavbarForms>
                                {isReg ? (
                                    <RegistrationForm onSubmit={handleSubmit} />
                                ) : (
                                    <LoginForm onSubmit={handleLogin} />
                                )}
                            </NavbarForms>
                        </PopupBackplane>
                    </ClickOutHandler>
                )}
            </AnimatePresence>
        </Div>
    ) : (
        <Div layout>
            <User>
                <span>You logged in, </span> {currentUser.name}
            </User>
            <Link onClick={handleLogout}>Logout</Link>
        </Div>
    );
};
