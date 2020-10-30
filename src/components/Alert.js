import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { alertMotion } from '../animations';
import { hideAlert } from '../store/actions';

export const Alert = () => {
    const { visible, type, text } = useSelector((state) => state.alert);
    const dispatch = useDispatch();

    return (
        <AnimatePresence initial={false}>
            {visible && (
                <motion.div
                    layout
                    {...alertMotion}
                    className={`alert alert-${
                        type || 'warning'
                    } alert-dismissible`}
                >
                    {text}
                    <button
                        type="button"
                        className="close"
                        onClick={() => dispatch(hideAlert())}
                    >
                        <span>&times;</span>
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
