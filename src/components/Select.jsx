import React, { useState, useRef } from 'react';
import ClickOutHandler from 'react-onclickout';
import { motion, AnimatePresence } from 'framer-motion';
import { selectDropdownVariants, selectLiVariants } from '../animations';
import { SelectSC } from '../styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

export const Select = ({
    list,
    onChange,
    label,
    placeholder = 'Выберите вариант',
}) => {
    const [title, setTitle] = useState(
        list.length ? placeholder : 'Нет данных...'
    );
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const selectRef = useRef();
    const arrow = (
        <FontAwesomeIcon className="select-icon" icon={faChevronDown} />
    );

    const handleClick = (e) => {
        const { disabled } = selectRef.current.dataset;
        if (disabled === 'true') {
            return;
        }
        const { type } = e.target.dataset;
        setIsOpen(!isOpen);

        if (type === 'item') {
            const newTitle = e.target.innerText;
            setSelected(+e.target.dataset.id);
            setTitle(newTitle);
            onChange &&
                onChange({
                    selected: newTitle,
                });
        }
    };

    const outsideClick = () => {
        if (isOpen) {
            setIsOpen(!isOpen);
        }
    };

    return (
        <ClickOutHandler onClickOut={outsideClick}>
            <SelectSC
                onClick={handleClick}
                data-disabled={!list.length}
                ref={selectRef}
            >
                <div className="select-label">{label}</div>
                <div
                    className={`select-block${isOpen ? ' open' : ''}`}
                    data-type="title"
                >
                    {title}
                    {arrow}
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
                                        data-type="item"
                                    >
                                        {item.title}
                                    </motion.li>
                                ))}
                        </motion.ul>
                    )}
                </AnimatePresence>
            </SelectSC>
        </ClickOutHandler>
    );
};
