import { ADD_NOTE, HIDE_ALERT, REMOVE_NOTE, SHOW_ALERT } from './types';

export const addNote = (title) => {
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

export const hideAlert = () => {
    return {
        type: HIDE_ALERT,
    };
};

export const showAlert = (payload) => {
    let timer;
    return (dispatch) => {
        dispatch({
            type: SHOW_ALERT,
            payload,
        });
        clearTimeout(timer);
        timer = setTimeout(() => {
            dispatch(hideAlert());
            clearTimeout(timer);
        }, 3000);
    };
};
