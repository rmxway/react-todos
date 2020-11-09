import {
    CURRENT_USER,
    ADD_NOTE,
    ADD_USER,
    CHANGE_THEME,
    HIDE_ALERT,
    REMOVE_ALL_NOTES,
    REMOVE_NOTE,
    SHOW_ALERT,
} from './types';

export const addNote = (title, userId) => {
    return {
        type: ADD_NOTE,
        title,
    };
};

export const removeNote = (id) => {
    return {
        type: REMOVE_NOTE,
        id,
    };
};

export const removeAllNotes = () => {
    return {
        type: REMOVE_ALL_NOTES,
    };
};

export const hideAlert = () => {
    return {
        type: HIDE_ALERT,
    };
};

export const showAlert = (payload) => {
    return (dispatch) => {
        dispatch({
            type: SHOW_ALERT,
            payload,
        });
    };
};

export const changeTheme = (color) => {
    return {
        type: CHANGE_THEME,
        color,
    };
};

export const addUser = (user) => {
    return {
        type: ADD_USER,
        payload: {
            name: user.name,
            login: user.login,
            password: user.password,
            id: user.id,
        },
    };
};

export const currentUser = (user) => {
    return {
        type: CURRENT_USER,
        payload: {
            name: user.name,
            login: user.login,
            password: user.password,
            id: user.id,
        },
    };
};
