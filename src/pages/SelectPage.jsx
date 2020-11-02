import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Select } from '../components/Select';
import { SelectWrapper } from '../styles/sc/selectWrapper';
import { item, mainVariant } from '../styles/animations';
import { Fly, H1 } from '../styles/sc/base';

export const SelectPage = () => {
    const { notes } = useSelector((state) => state);
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
        {
            id: '12342342',
            title: 'Swift',
        },
    ];

    const onChange = (sel) => {
        console.log(sel);
    };
    return (
        <motion.div
            className="container"
            variants={mainVariant}
            initial="hidden"
            animate="visible"
        >
            <H1 variants={item}>Select page</H1>
            <motion.p variants={item}>Component Select</motion.p>
            <Fly />
            <SelectWrapper variants={item}>
                <Select
                    list={notes}
                    onChange={onChange}
                    label="Список заметок"
                    placeholder="Выберите заметку"
                />
            </SelectWrapper>
            <SelectWrapper variants={item}>
                <Select
                    list={list}
                    label="Модель"
                    placeholder="Выберите модель"
                />
                <Select list={list} label="Инструмент разработки" />
                <Select list={list} />
            </SelectWrapper>
        </motion.div>
    );
};
