import { ADD_NOTE, REMOVE_ALL_NOTES, REMOVE_NOTE } from './types';

const handlers = {
    [ADD_NOTE]: (state, { title }) =>
        state.concat({
            id: Math.floor(Math.random() * Date.now()),
            title,
            date: new Date().toLocaleTimeString(),
        }),
    [REMOVE_NOTE]: (state, { id }) => {
        return state.filter((note) => note.id !== id) || [];
    },
    [REMOVE_ALL_NOTES]: (state) => {
        return (state.note = []);
    },
    DEFAULT: (state) => state,
};

const initialState = JSON.parse(localStorage.getItem('notes')) || [];

export const notesReducer = (state = initialState, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT;
    return handle(state, action);
};
