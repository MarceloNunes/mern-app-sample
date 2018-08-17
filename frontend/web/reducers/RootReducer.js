import { combineReducers } from 'redux';
import { UserReducer, UserMetaReducer } from './Users.reducer';

export default combineReducers({
    users: UserReducer,
    usersMeta: UserMetaReducer
});