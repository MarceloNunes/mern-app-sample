import { USER_FETCH } from '../actions/actionTypes';

export const UserReducer = (state = [], action) => {
  switch (action.type) {
    case USER_FETCH:
      return action.users;
    default:
      return state;
  }
};

export default UserReducer;