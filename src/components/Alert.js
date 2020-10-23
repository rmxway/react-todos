import React, { useContext } from 'react';
import { alertMotion } from '../animations';
import { AlertContext } from '../context/alert/alertContext';
import { motion, AnimatePresence } from 'framer-motion';

export const Alert = () => {
    const { alert, hide } = useContext(AlertContext);

    return (
        <AnimatePresence initial={false}>
            {alert.visible && (
                <motion.div
                    layout
                    {...alertMotion}
                    className={`alert alert-${
                        alert.type || 'warning'
                    } alert-dismissible`}
                >
                    <strong>Внимание! </strong>
                    {alert.text}
                    <button onClick={hide} type="button" className="close">
                        <span>&times;</span>
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
