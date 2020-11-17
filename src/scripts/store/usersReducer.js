import {
    ADD_NOTE,
    ADD_USER,
    CHANGE_COMPLETED,
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
    let curUser = state.list.find((user) => user.id === state.currentUser.id);
    switch (action.type) {
        case ADD_NOTE:
            const newNote = {
                id: Math.floor(Math.random() * Date.now()),
                title: action.title,
                completed: false,
                date: `[ ${new Date().toLocaleDateString()} ] ${new Date().toLocaleTimeString()}`,
            };
            curUser.notes.push(newNote);
            return { ...state };
        case REMOVE_NOTE:
            curUser.notes = curUser.notes.filter(
                (note) => note.id !== action.id
            );
            return { ...state };
        case REMOVE_ALL_NOTES:
            curUser.notes = [];
            return { ...state };
        case CHANGE_COMPLETED:
            const curNote = curUser.notes.find((note) => note.id === action.id);
            console.log(curNote.title);
            curNote.completed = !curNote.completed;
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
