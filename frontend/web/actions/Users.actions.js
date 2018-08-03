import { USER_FETCH } from './actionTypes';

export const fetchUsers = (users) => ({
  type: USER_FETCH,
  users,
});