import {
    ADD_NOTE,
    ADD_USER,
    CURRENT_USER,
    REMOVE_ALL_NOTES,
    REMOVE_NOTE,
} from './types';

const emptyUsers = {
    list: [],
    currentUser: {},
};

const preUsers = localStorage.getItem('users')
    ? JSON.parse(localStorage.getItem('users'))
    : emptyUsers;

const initialState = {
    ...preUsers,
};

export const userReducer = (state = initialState, action) => {
    const curUser = state.list.find((user) => user.id === state.currentUser.id);
    console.log(state);
    switch (action.type) {
        case ADD_NOTE:
            curUser.notes.push({
                id: Math.floor(Math.random() * Date.now()),
                title: action.title,
                date: `[ ${new Date().toLocaleDateString()} ] ${new Date().toLocaleTimeString()}`,
            });
            return { ...state };
        case REMOVE_NOTE:
            curUser.notes.filter((note) => note.id !== action.id);
            return { ...state };
        case REMOVE_ALL_NOTES:
            curUser.notes = [];
            return { ...state };
        case ADD_USER:
            const list = state.list.concat({ ...action.payload, notes: [] });
            localStorage.setItem('users', JSON.stringify(state));
            return {
                ...state,
                list,
            };
        case CURRENT_USER:
            return { ...state, currentUser: action.payload };
        default:
            return state;
    }
};
