import { AUTH_LOGIN } from './actionTypes';

export const login = session => ({
    type: AUTH_LOGIN,
    session
});