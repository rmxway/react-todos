import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { selectDropdownVariants, selectLiVariants } from '../animations';
import { SelectSC } from '../styled';

export const Select = ({ list }) => {
    const [title, setTitle] = useState('Выберите технологию');
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(0);

    const handleClick = (e) => {
        const { type } = e.target.dataset;
        setIsOpen(!isOpen);

        if (type !== 'title') {
            const newTitle = e.target.innerText;
            setSelected(+e.target.dataset.id);
            setTitle(newTitle);
        }
    };
    return (
        <SelectSC onClick={handleClick}>
            <div className="select-block" data-type="title">
                {title}
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        variants={selectDropdownVariants}
                        initial="close"
                        animate={isOpen ? 'open' : 'close'}
                        exit="exit"
                    >
                        {list.length &&
                            list.map((item, idx) => (
                                <motion.li
                                    variants={selectLiVariants}
                                    key={item.id}
                                    className={
                                        selected === idx ? 'selected' : ''
                                    }
                                    data-id={idx}
                                >
                                    {item.title}
                                </motion.li>
                            ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </SelectSC>
    );
};
