import React from 'react';

import { motion } from 'framer-motion';
import styled from 'styled-components';
import { fadein } from 'styles/animations';
import { MotionButton } from 'styles/sc/base';

export const FormBlock = styled(motion.form)`
    max-width: 400px;

    ${MotionButton} {
        width: 100%;
        margin-top: 10px;
    }
`;

export const stringPattern = RegExp(/^[а-яА-ЯёЁ a-zA-Z]+$/);

export const Label = styled(motion.label)`
    position: relative;
    display: block;
    left: 2px;
    margin-bottom: 5px;
    font-size: 10px;
    opacity: 0.7;
    text-transform: uppercase;
`;

export const ErrorForm = styled(motion.div).attrs(() => ({
    variants: fadein,
    initial: 'hidden',
    animate: 'visible',
    exit: 'exit',
}))`
    color: ${(props) => props.theme.colors.danger};

    margin: -5px 0 5px;
    font-size: 11px;
`;

export const NavbarForms = ({ children }) => {
    return <>{children}</>;
};
