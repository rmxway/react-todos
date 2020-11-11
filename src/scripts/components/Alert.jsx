import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import styled, { css } from 'styled-components';
import { alertMotion } from 'styles/animations';
import { hideAlert } from 'scripts/store/actions';
import { lighten } from 'polished';
import { Container, MotionButton } from 'styles/sc/base';

const AlertSC = styled(motion.div)`
    position: fixed;
    line-height: 1;
    display: flex;
    font-size: 16px;
    justify-content: space-between;
    align-items: center;
    padding: 12px 20px;
    border-radius: 4px;
    color: ${(props) => props.theme.textColor};
    top: 50px;
    left: 0;
    right: 0;
    box-shadow: ${(props) => props.theme.shadows.alert};
    z-index: ${(props) => props.theme.z.modal};
    margin: 0 15px;

    ${(props) =>
        props.type === 'danger'
            ? css`
                  background-color: ${lighten(0.08, props.theme.colors.danger)};
              `
            : props.type === 'success'
            ? css`
                  background-color: ${lighten(
                      0.15,
                      props.theme.colors.success
                  )};
              `
            : css`
                  background-color: ${lighten(0.1, props.theme.colors.warning)};
                  color: #333;
              `};
`;

const Close = styled(MotionButton)`
    border: none;
    background-color: #2227;
    color: white;
    padding: 5px;
    width: 30px;
    margin-right: 0;
`;

export const Alert = () => {
    const { visible, type, text } = useSelector((state) => state.alert);
    const dispatch = useDispatch();
    let timeout;
    let timer = () =>
        (timeout = setTimeout(() => {
            clearTimeout(timeout);
            dispatch(hideAlert());
        }, 3300));

    useEffect(() => {
        clearTimeout(timeout);
        if (visible) {
            timer();
        }
        return () => {
            clearTimeout(timeout);
        };
    });

    return (
        <AnimatePresence initial={false}>
            {visible && (
                <Container>
                    <AlertSC type={type} layout {...alertMotion}>
                        {text}
                        <Close
                            type="button"
                            className="close"
                            onClick={() => dispatch(hideAlert())}
                        >
                            <span>&times;</span>
                        </Close>
                    </AlertSC>
                </Container>
            )}
        </AnimatePresence>
    );
};
