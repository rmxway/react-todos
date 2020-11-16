import React, { useRef } from 'react';
import styled from 'styled-components';
import { transparentize } from 'polished';
import { motion, AnimatePresence } from 'framer-motion';
import { fadein, item } from 'styles/animations';
import { MotionButton } from 'styles/sc/base';

const ModalWrapper = styled(motion.section)`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: ${(props) => transparentize(0.2, props.theme.bg)};
    z-index: ${(props) => props.theme.z.modal};
`;

const ModalWindow = styled(motion.div)`
    position: relative;
    max-width: ${(props) => (props.width ? props.width : '300px')};
    width: 100%;
    min-height: 200px;
    color: #222;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: ${(props) => props.theme.shadows.modal};

    ${MotionButton} {
        margin-top: 20px;
        width: 100%;
        color: #222;
        border-color: #222;
    }
`;

const ModalTitle = styled.div`
    font-size: 25px;
    margin-bottom: 20px;
`;
const ModalBody = styled.div``;
const Close = styled.div`
    position: absolute;
    right: 10px;
    top: 10px;
    width: 20px;
    height: 20px;
    font-size: 30px;
    cursor: pointer;
    transition: 0.2s;
    opacity: 0.7;

    &:hover {
        opacity: 1;
    }
`;

export const Modal = ({ open, onClose, title, body, noClose }) => {
    const modalRef = useRef();
    const handleClickOut = (e) => {
        if (e.target === modalRef.current) onClose();
    };
    return (
        <AnimatePresence exitBeforeEnter>
            {open && (
                <ModalWrapper
                    variants={fadein}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    ref={modalRef}
                    onClick={handleClickOut}
                >
                    <ModalWindow variants={item} width="400px">
                        {title && <ModalTitle>{title}</ModalTitle>}
                        {body && <ModalBody>{body}</ModalBody>}
                        {!noClose && <Close onClick={onClose}>&times;</Close>}
                    </ModalWindow>
                </ModalWrapper>
            )}
        </AnimatePresence>
    );
};
