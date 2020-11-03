import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeAllNotes, removeNote, showAlert } from '../store/actions';

import { AnimatePresence, motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import { FlexBlock, MotionButton } from '../styles/sc/base';
import { item, noteMotion, notesVariant } from '../styles/animations';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { darken, lighten } from 'polished';

const NonNotes = styled(motion.p)`
    position: absolute;
`;

const NoteTitle = styled(motion.div)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0 10px 2px;
    font-size: 20px;

    .button {
        margin-right: 0;
        font-size: 13px;
    }
`;

const NoteNumber = styled(motion.div)`
    display: inline-block;
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    color: white;
    width: 35px;
    height: 45px;
    letter-spacing: 0;
    line-height: 50px;
    margin: 0 20px 0 0;
    // border-bottom: 1px solid ${(props) => props.theme.bg};
    background-color: ${(props) => props.theme.colors.silver};

    ${(props) => {
        if (props.theme.currentTheme === 'light') {
            return css`
                background-color: ${lighten(0.3, props.theme.colors.silver)};
            `;
        }
    }}
`;

const Note = styled(motion.li).attrs(() => ({
    // анимации motion
    ...noteMotion,
}))`
    color: ${(props) => props.theme.textColor};
    background-color: ${(props) => darken(0.05, props.theme.bg)};
    border: 1px solid ${(props) => props.theme.borderColor};
    border-top: none;
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 10px;
    transition-property: background-color;
    transition-duration: 0.3s;

    &:first-child {
        border-radius: 4px 4px 0 0;
        border-top: 1px solid ${(props) => props.theme.borderColor};
    }

    &:last-child {
        border-radius: 0 0 4px 4px;
    }
`;

export const Notes = () => {
    const { notes } = useSelector((state) => state);
    const dispatch = useDispatch();
    const noItems = !notes.length;
    const trashIcon = <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>;
    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);

    const handleClick = (id) => {
        dispatch(removeNote(id));
        const payload = {
            text: 'Запись удалена',
        };
        dispatch(showAlert(payload));
    };

    const handleRemoveAllNotes = () => {
        dispatch(removeAllNotes());
        const payload = {
            text: 'Все записи были удалены',
        };
        dispatch(showAlert(payload));
    };
    return (
        <motion.div variants={item}>
            {noItems && <NonNotes variants={item}>Нет записей</NonNotes>}
            {!noItems && (
                <NoteTitle>
                    Список задач
                    <MotionButton
                        onClick={handleRemoveAllNotes}
                        className="button"
                    >
                        удалить все {trashIcon}
                    </MotionButton>
                </NoteTitle>
            )}
            <motion.ul variants={notesVariant} className="list-group">
                <AnimatePresence>
                    {notes.map((note, idx) => {
                        return (
                            <Note variants={item} layout key={note.id}>
                                <FlexBlock>
                                    <NoteNumber>{idx + 1}</NoteNumber>
                                    <strong>{note.title}&nbsp; – &nbsp;</strong>
                                    <small>{note.date}</small>
                                </FlexBlock>
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary btn-sm"
                                    onClick={() => handleClick(note.id)}
                                >
                                    &times;
                                </button>
                            </Note>
                        );
                    })}
                </AnimatePresence>
            </motion.ul>
        </motion.div>
    );
};
