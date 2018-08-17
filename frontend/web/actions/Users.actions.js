import { USER_FETCH } from './actionTypes';

export const fetchUsers = (users, usersMeta) => ({
  type: USER_FETCH,
  users,
  usersMeta,
});