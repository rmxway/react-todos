import React from 'react';
import { motion } from 'framer-motion';
import { Form } from '../components/Form';
import { Notes } from '../components/Notes';
import { Fly, H1 } from '../styled';
import { item, mainVariant } from '../animations';

export const NotePage = () => {
    return (
        <>
            <motion.div
                className="container"
                variants={mainVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <H1>React Notes App</H1>
                <motion.p variants={item}>TodoList, Animations</motion.p>
                <Fly />
                <Form />
                <Notes />
            </motion.div>
        </>
    );
};
