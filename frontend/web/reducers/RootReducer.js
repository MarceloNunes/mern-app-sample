import { combineReducers } from 'redux';
import { UserReducer, UserMetaReducer } from './users.reducer';
import { SessionReducer } from './session.reducer';

export default combineReducers({
    users: UserReducer,
    usersMeta: UserMetaReducer,
    session: SessionReducer
});