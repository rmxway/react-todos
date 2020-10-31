import { combineReducers } from 'redux';
import { alertReducer } from './alertReducer';
import { appReducer } from './appReducer';
import { notesReducer } from './notesReducer';

export const rootReducer = combineReducers({
    alert: alertReducer,
    notes: notesReducer,
    app: appReducer,
});
