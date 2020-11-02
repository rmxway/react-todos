import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { alertMotion } from '../styles/animations';
import { hideAlert } from '../store/actions';

export const Alert = () => {
    const { visible, type, text } = useSelector((state) => state.alert);
    const { notes } = useSelector((state) => state);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     let timer;
    //     clearTimeout(timer);

    //     timer = setTimeout(() => {
    //         dispatch(hideAlert());
    //         clearTimeout(timer);
    //     }, 3000);

    //     return () => {
    //         clearTimeout(timer);
    //     };
    // }, []);
    return (
        <AnimatePresence initial={false}>
            {visible && (
                <div className="container">
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
                </div>
            )}
        </AnimatePresence>
    );
};
