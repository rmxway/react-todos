import { ADD_NOTE, REMOVE_NOTE } from '../types';

const handlers = {
    [ADD_NOTE]: (state, { title }) =>
        state.concat({
            id: Date.now(),
            title,
            date: new Date().toLocaleTimeString(),
        }),
    [REMOVE_NOTE]: (state, { id }) => {
        return state.filter((note) => note.id !== id) || [];
    },
    DEFAULT: (state) => state,
};

export const notesReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT;
    return handle(state, action);
};
