import React from 'react';
import { motion } from 'framer-motion';
import { Select } from '../components/Select';
import { item, mainVariant } from '../animations';
import { H1 } from '../styled';

export const SelectPage = () => {
    const list = [
        {
            id: '23423',
            title: 'React',
        },
        {
            id: '4324232',
            title: 'Vue',
        },
        {
            id: '1235432',
            title: 'Angular',
        },
    ];
    return (
        <motion.div
            className="container"
            variants={mainVariant}
            initial="hidden"
            animate="visible"
        >
            <H1 variants={item}>Select page</H1>
            <motion.p variants={item}>Component Select</motion.p>

            <Select list={list} />
        </motion.div>
    );
};
