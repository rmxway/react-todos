import { motion } from 'framer-motion';
import styled from 'styled-components';
import { darken } from 'polished';
import { transitionMixin } from './mixins';

export const H1 = styled.h1`
    color: ${(props) => props.theme.primary};
    ${transitionMixin}
`;

export const Fly = styled.div`
    height: 40px;
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
        outline: none;
        color: ${(props) => props.theme.primary};
    }

    &:focus {
        border-color: ${(props) => props.theme.primary};
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

export const Backplane = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: ${(props) => props.theme.z.modal};
    background-color: #222;
`;
