import axios from 'axios';
import queryString from 'query-string';
import config from '../../../config/config';
import { fetchUsers } from  '../actions/Users.actions';

const apiUrl = config.baseUrl + '/users';

const getQueryString = (apiUrl, params) => {
  const paramsString = queryString.stringify(params);
  return paramsString ? apiUrl + '?' + paramsString : apiUrl;
}

export const fetchAllUsers = (params) =>
  (dispatch) => axios.get(getQueryString(apiUrl, params))
    .then(response => {
      dispatch(fetchUsers(response.data));
    })
    .catch(error => {
      throw(error);
    });
