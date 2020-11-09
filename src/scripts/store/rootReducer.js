import { combineReducers } from 'redux';
import { alertReducer } from './alertReducer';
import { appReducer } from './appReducer';
import { userReducer } from './usersReducer';

export const rootReducer = combineReducers({
    alert: alertReducer,
    app: appReducer,
    users: userReducer,
});
