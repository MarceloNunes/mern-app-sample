// https://stackoverflow.com/questions/36367648/handling-api-calls-in-redux-with-axios

import axios from 'axios';
export const LIST_USERS = 'LIST_USERS';

export function getAllUsers() {
  const request = axios.get('http://localhost:3000/api/users');

  console.log(request);

  return {
    type: LIST_USERS,
    payload: request
  };
}