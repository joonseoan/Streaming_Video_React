import {combineReducers } from 'redux';

// another single reducer...from redux-form
//  which is not from another js file.
// as fromReducer : alias of "reducer"
//  because we would have a lot of reducers
//  we would need a unique name of each reduer.
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';

export default combineReducers({
    auth: authReducer,
    // combine redux-form reducer.
    form: formReducer
});