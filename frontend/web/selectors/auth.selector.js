import axios from 'axios';
import config from '../../../config/config';
import {
  login
} from '../actions/Auth.actions';

export const sessionLogin = (data) =>
  (dispatch) => axios({
    method: 'post',
    url: config.baseUrl + '/auth/',
    data
  })
  .then(response => {
    dispatch(login(response.data));
  })
  .catch(error => {
    throw (error);
  });