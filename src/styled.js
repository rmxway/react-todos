import { motion } from 'framer-motion';
import styled from 'styled-components';
import { darken } from 'polished';
import { noteMotion } from './animations';

export const theme = {
    light: {
        bg: '#fff',
        textColor: '#333',
        borderColor: '#ccc',
        primary: '#24777B',
    },
    dark: {
        bg: '#333',
        textColor: '#fff',
        borderColor: '#777',
        primary: '#1da',
    },
};

const transitionMixin = {
    transition: '.3s',
};

export const App = styled(motion.section)`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    min-height: 100vh;
    color: ${(props) => props.theme.textColor};
    background-color: ${(props) => props.theme.bg};
    transition: 0.5s;
`;

export const H1 = styled.h1`
    color: ${(props) => props.theme.primary};
    ${transitionMixin}
`;

export const Nav = styled.nav`
    background-color: ${(props) => props.theme.primary};
    padding: 10px;
    margin-bottom: 20px;
    box-shadow: 0 5px 30px #fff4;
    ${transitionMixin}

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
            margin: 0;
            padding: 2px 10px;
            margin-right: 5px;

            a {
                color: white;
            }
        }
    }
`;

export const Input = styled.input`
    padding: 20px 10px;
    ${transitionMixin}
    &,
    &:focus {
        background-color: ${(props) => props.theme.bg};
        border-color: ${(props) => props.theme.primary};
        color: ${(props) => props.theme.primary};
    }

    &:focus {
        box-shadow: 0 0 5px ${(props) => props.theme.primary},
            0 0 5px ${(props) => props.theme.primary};
    }
`;

export const NonNotes = styled.p`
    position: absolute;
`;

export const Note = styled(motion.li).attrs(() => ({
    // анимации motion
    ...noteMotion,
}))`
    color: ${(props) => props.theme.textColor};
    background-color: ${(props) => darken(0.05, props.theme.bg)};
    border: 1px solid ${(props) => props.theme.borderColor};
    border-top: none;
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    transition-property: background-color;
    transition-duration: 0.3s;

    &:first-child {
        border-radius: 4px 4px 0 0;
        border-top: 1px solid ${(props) => props.theme.borderColor};
    }

    &:last-child {
        border-radius: 0 0 4px 4px;
    }
`;

export const Button = styled(motion.button).attrs(() => ({
    whileHover: { scale: 1 },
    whileTap: { scale: 0.95 },
    transition: { duration: 0.2 },
}))`
    border: 2px solid white;
    color: white;
    border-radius: 5px;
    padding: 5px 10px;
    margin-right: 15px;
    outline: none;
    background-color: #fff0;

    &:focus {
        outline: none;
    }
`;

export const ImageComponent = styled.div`
    position: relative;
    margin: 50px 0;
    height: 400px;

    img {
        position: relative;
        max-height: 100%;
        box-shadow: 0 5px 15px #0007;
        z-index: 2;
    }
`;

export const Backplane = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-color: #222;
`;
