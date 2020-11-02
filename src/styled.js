import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';
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
        primary: '#aada3D',
    },
};

const borderColor = (props) => props.theme.borderColor;

const transitionMixin = {
    transition: '.3s',
};

export const App = styled(motion.section)`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    flex: 1;
    padding-top: 65px;
    padding-bottom: 40px;
    color: ${(props) => props.theme.textColor};
    background-color: ${(props) => props.theme.bg};
    transition: 0.5s;
`;

export const H1 = styled.h1`
    color: ${(props) => props.theme.primary};
    ${transitionMixin}
`;

export const Fly = styled.div`
    height: 40px;
`;

export const Nav = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
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

export const Input = styled.input`
    padding: 15px;
    background-color: ${(props) => darken(0.04, props.theme.bg)};
    border-radius: 4px;
    border: 1px solid ${(props) => props.theme.borderColor};
    padding: 15px;
    width: 100%;
    margin-bottom: 20px;
    ${transitionMixin}
    &,
    &:focus {
        // background-color: ${(props) => props.theme.bg};
        outline: none;
        color: ${(props) => props.theme.primary};
    }

    &:focus {
        border-color: ${(props) => props.theme.primary};
    }
`;

export const NonNotes = styled(motion.p)`
    position: absolute;
`;

export const NoteTitle = styled(motion.div)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0 10px 2px;
    font-size: 12px;

    .button {
        margin-right: 0;
        border-color: ${(props) => props.theme.textColor};
        color: ${(props) => props.theme.textColor};
    }
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

export const MotionButton = styled(motion.button).attrs(() => ({
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

export const ImageComponent = styled(motion.div)`
    position: relative;
    margin: 50px 0;
    height: 400px;
    width: 100%;

    img {
        position: absolute;
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

export const SelectWrapper = styled(motion.section)`
    margin: 0 -10px;
    display: flex;
    flex-wrap: nowrap;
`;

export const SelectSC = styled(motion.div)`
    position: relative;
    display: block;
    flex: 1;
    margin: 20px 10px;
    cursor: pointer;

    ${(props) =>
        props.noItems &&
        css`
            opacity: 0.2;
            cursor: default;
        `}

    .select {
        &-label {
            position: absolute;
            left: 2px;
            top: -20px;
            font-size: 10px;
            opacity: 0.5;
            text-transform: uppercase;
        }
        &-block {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px;
            background-color: ${(props) => darken(0.02, props.theme.bg)};
            border-radius: 4px;
            border: 1px solid ${borderColor};
            transition: 0.2s;

            &.open {
                border-color: ${(props) => props.theme.primary};
                .select-icon {
                    transform: scale(1, -1);
                }
            }
        }

        &-icon {
            transition: 0.2s;
        }
    }

    ul {
        position: absolute;
        top: calc(100% + 2px);
        left: 0;
        width: 100%;
        max-height: 250px;
        list-style: none;
        padding: 0;
        margin: 0;
        overflow: hidden;
        overflow-y: auto;
        z-index: 1;
        border-radius: 0 0 4px 4px;
        box-shadow: 0 7px 20px #2227;
        background-color: ${(props) => darken(0.05, props.theme.bg)};

        li {
            cursor: pointer;
            padding: 15px;
            border-bottom: 1px solid
                ${(props) => darken(0.1, props.theme.borderColor)};
            transition: 0.1s;

            &.selected,
            &.selected:hover {
                background-color: ${(props) => darken(0.1, props.theme.bg)};
            }

            &:last-child {
                border-bottom: none;
            }

            &:hover {
                background-color: ${(props) => props.theme.bg};
            }
        }
    }
`;
