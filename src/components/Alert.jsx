import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import styled, { css } from 'styled-components';
import { alertMotion } from '../styles/animations';
import { hideAlert } from '../store/actions';
import { lighten } from 'polished';

const AlertSC = styled(motion.div)`
    position: absolute;
    line-height: 1;
    display: flex;
    font-size: 16px;
    justify-content: space-between;
    align-items: center;
    padding: 12px 20px;
    border-radius: 4px;
    color: ${(props) => props.theme.textColor};
    left: 0;
    right: 0;
    box-shadow: ${(props) => props.theme.shadows.alert};
    z-index: ${(props) => props.theme.z.modal};
    margin: 0 15px;

    ${(props) =>
        props.type === 'danger'
            ? css`
                  background-color: ${lighten(0.15, props.theme.colors.danger)};
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

export const Alert = () => {
    const { visible, type, text } = useSelector((state) => state.alert);
    const dispatch = useDispatch();

    useEffect(() => {
        let timer;
        clearTimeout(timer);
        if (visible) {
            timer = setTimeout(() => {
                clearTimeout(timer);
                dispatch(hideAlert());
            }, 3300);
        }
        return () => {
            clearTimeout(timer);
        };
    });
    return (
        <AnimatePresence initial={false}>
            {visible && (
                <div className="container">
                    <AlertSC type={type} layout {...alertMotion}>
                        {text}
                        <button
                            type="button"
                            className="close"
                            onClick={() => dispatch(hideAlert())}
                        >
                            <span>&times;</span>
                        </button>
                    </AlertSC>
                </div>
            )}
        </AnimatePresence>
    );
};
