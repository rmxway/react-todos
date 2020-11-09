import React, { useState } from 'react';
import ClickOutHandler from 'react-onclickout';

import { motion, AnimatePresence } from 'framer-motion';
import { selectDropdownVariants, selectLiVariants } from 'styles/animations';
import { darken } from 'polished';
import styled, { css } from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

export const SelectSC = styled(motion.div)`
    position: relative;
    display: block;
    flex: 1;
    margin: 20px 10px;
    cursor: pointer;

    ${(props) => {
        if (props.noItems) {
            return css`
                opacity: 0.4;
                cursor: default;
            `;
        }
    }}

    .select {
        &-label {
            position: absolute;
            left: 2px;
            top: -20px;
            font-size: 10px;
            font-family: 'Roboto Condensed', sans-serif;
            letter-spacing: 1px;
            opacity: 0.7;
            text-transform: uppercase;
        }
        &-block {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px;
            background-color: ${(props) => darken(0.02, props.theme.bg)};
            border-radius: 4px;
            border: 1px solid ${(props) => props.theme.borderColor};
            transition: 0.2s;

            &.open {
                border-color: ${(props) => props.theme.primary};
                .select-icon {
                    transform: scale(1, -1);
                }
            }
        }

        &-icon {
            transition: 0.2s;
        }
    }

    ul {
        position: absolute;
        top: calc(100% + 2px);
        left: 0;
        width: 100%;
        max-height: 250px;
        list-style: none;
        padding: 0;
        margin: 0;
        overflow: hidden;
        overflow-y: auto;
        z-index: 1;
        border-radius: 0 0 4px 4px;
        box-shadow: 0 7px 20px #2227;
        background-color: ${(props) => darken(0.05, props.theme.bg)};

        li {
            cursor: pointer;
            padding: 15px;
            border-bottom: 1px solid
                ${(props) => darken(0.1, props.theme.borderColor)};
            transition: 0.1s;

            &.selected,
            &.selected:hover {
                background-color: ${(props) => darken(0.1, props.theme.bg)};
            }

            &:last-child {
                border-bottom: none;
            }

            &:hover {
                background-color: ${(props) => props.theme.bg};
            }
        }
    }
`;

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
    const noItems = !list.length;
    const arrow = (
        <FontAwesomeIcon className="select-icon" icon={faChevronDown} />
    );

    const handleClick = (e) => {
        if (noItems) {
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
            <SelectSC onClick={handleClick} noItems={noItems}>
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
                                        {/*item.date && item.date*/}
                                    </motion.li>
                                ))}
                        </motion.ul>
                    )}
                </AnimatePresence>
            </SelectSC>
        </ClickOutHandler>
    );
};
