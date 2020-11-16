import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeAllNotes, removeNote, showAlert } from 'scripts/store/actions';

import { AnimatePresence, motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import { Div, FlexBlock, MotionButton } from 'styles/sc/base';
import { item, noteMotion, notesVariant } from 'styles/animations';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { darken, lighten } from 'polished';

import { Form } from 'components/Form';

const NonNotes = styled(motion.p)`
    position: absolute;
`;

const NoteTitle = styled(motion.div)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0 10px 2px;
    font-size: 20px;

    ${MotionButton} {
        margin-right: 0;
        font-size: 14px;
        padding: 10px;
    }
`;

const List = styled(motion.ul)`
    margin: 0;
    padding: 0;
`;

const AlertParagraph = styled(motion.div)`
    width: 100%;
    margin-top: 100px;
    text-align: center;
    font-size: 20px;
    font-weight: 100;
    letter-spacing: 2px;
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

const Close = styled(MotionButton)`
    padding: 5px;
    width: 30px;
    margin-right: 0;
`;

export const Notes = () => {
    const { users } = useSelector((state) => state);
    const { currentUser } = users;

    const findUserNotes = users.currentUser.name
        ? users.list.find((user) =>
              currentUser.name ? user.id === currentUser.id : null
          ).notes
        : undefined;

    const dispatch = useDispatch();
    const noItems = findUserNotes ? !findUserNotes.length : null;
    const trashIcon = <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>;

    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users));
    }, [users]);

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
    return currentUser.name ? (
        <motion.div variants={item}>
            <Form />
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
            <List variants={notesVariant}>
                <AnimatePresence>
                    {!noItems &&
                        findUserNotes.map((note, idx) => {
                            return (
                                <Note variants={item} layout key={note.id}>
                                    <FlexBlock>
                                        <NoteNumber>{idx + 1}</NoteNumber>
                                        <strong>
                                            {note.title}&nbsp; – &nbsp;
                                        </strong>
                                        <small>{note.date}</small>
                                    </FlexBlock>
                                    <Close
                                        type="button"
                                        onClick={() => handleClick(note.id)}
                                    >
                                        &times;
                                    </Close>
                                </Note>
                            );
                        })}
                </AnimatePresence>
            </List>
        </motion.div>
    ) : (
        <AlertParagraph variants={item} transition={{ duration: 1 }}>
            <Div>Зайдите в свой аккаунт либо зарегистрируйте новый.</Div>
        </AlertParagraph>
    );
};
