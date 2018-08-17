import { USER_FETCH } from '../actions/actionTypes';

export const UserReducer = (state = [], action) => {
  switch (action.type) {
    case USER_FETCH:
      return action.users;
    default:
      return state;
  }
};

export const UserMetaReducer = (state = [], action) => {
  switch (action.type) {
    case USER_FETCH:
      return action.usersMeta;
    default:
      return state;
  }
};

export default UserReducer;