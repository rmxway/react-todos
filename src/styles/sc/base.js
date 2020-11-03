import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import { darken } from 'polished';

export const H1 = styled.h1`
    color: ${(props) => props.theme.primary};
    transition: ${(props) => props.theme.transitions.default};
`;

export const Fly = styled.div`
    height: 40px;
`;

export const Input = styled(motion.input)`
    padding: 15px;
    background-color: ${(props) => darken(0.04, props.theme.bg)};
    border-radius: 4px;
    border: 1px solid ${(props) => props.theme.borderColor};
    padding: 15px;
    width: 100%;
    margin-bottom: 20px;
    transition: ${(props) => props.theme.transitions.default};

    &,
    &:focus {
        outline: none;
        color: ${(props) => props.theme.textColor};
    }

    &:focus {
        border-color: ${(props) => props.theme.primary};
    }

    ${(props) => {
        if (props.error) {
            return css`
                &,
                &:focus {
                    border-color: ${props.theme.colors.danger};
                }
            `;
        }
    }}
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

    /* ${(props) => {
        if (props.disabled) {
            return css`
                pointer-events: none;
                opacity: 0.5;
            `;
        }
    }} */
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
