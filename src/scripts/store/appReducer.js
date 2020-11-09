const { CHANGE_THEME } = require('./types');

const initialState = {
    color: localStorage.getItem('color') || 'light',
};

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_THEME:
            return { ...state, color: action.color };
        default:
            return state;
    }
};
