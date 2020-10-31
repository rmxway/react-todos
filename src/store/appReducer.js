const { CHANGE_THEME } = require('./types');

const initialState = {
    color: localStorage.getItem('color') || 'light',
};

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_THEME:
            return { color: action.color };
        default:
            return state;
    }
};
