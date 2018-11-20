import { AUTH_LOGIN } from '../actions/actionTypes';

export const SessionReducer = (state = [], action) => {
  switch (action.type) {
    case AUTH_LOGIN:
      return action.session;
    default:
      return state;
  }
};

export default SessionReducer;