const { CHANGE_THEME, ADD_USER, ACTIVE_USER } = require('./types');

const initialState = {
    color: localStorage.getItem('color') || 'light',
    users: JSON.parse(localStorage.getItem('users')) || [],
    currentUser: JSON.parse(localStorage.getItem('active-user')) || [],
};

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_THEME:
            return { ...state, color: action.color };
        case ADD_USER:
            const users = state.users.concat(action.payload);
            localStorage.setItem('users', JSON.stringify(users));
            return {
                ...state,
                users,
            };
        case ACTIVE_USER:
            localStorage.setItem('active-user', JSON.stringify(action.payload));
            return { ...state, currentUser: action.payload };
        default:
            return state;
    }
};
