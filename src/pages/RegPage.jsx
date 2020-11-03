import React from 'react';

import { motion } from 'framer-motion';
import { RegistrationForm } from '../components/RegistrationForm';
import { item, mainVariant } from '../styles/animations';
import { Fly, H1 } from '../styles/sc/base';

export const RegPage = () => {
    return (
        <>
            <motion.div
                className="container"
                variants={mainVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <H1>Registration Formik</H1>
                <motion.p variants={item}>
                    Formik is compatible with React v15+ and works with ReactDOM
                    and React Native.
                </motion.p>
                <Fly />
                <RegistrationForm />
            </motion.div>
        </>
    );
};
