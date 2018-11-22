import axios from 'axios';
import queryString from 'query-string';
import config from '../../../config/config';
import {
  fetchUsers
} from '../actions/Users.actions';

const apiUrl = config.baseUrl + '/users';

const getQueryString = (apiUrl, params) => {
  const paramsString = queryString.stringify(params);
  return paramsString ? apiUrl + '?' + paramsString : apiUrl;
}

const convertHeadersToMetaList = headers => ({
  activePage: parseInt(headers['meta-activepage']),
  count: parseInt(headers['meta-count']),
  dir: parseInt(headers['meta-dir']),
  limit: parseInt(headers['meta-limit']),
  skip: parseInt(headers['meta-skip']),
  totalPages: parseInt(headers['meta-totalpages']),
  firstPage: headers['meta-firstpage'],
  previousPage: headers['meta-previouspage'],
  nextPage: headers['meta-nextpage'],
  lastPage: headers['meta-lastpage'],
  sortBy: headers['meta-sortby']
});

export const fetchAllUsers = (params) =>
  (dispatch) => axios({
    method: 'get',
    url: getQueryString(apiUrl, params),
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('SESSION_TOKEN')
    }
  })
  .then(response => {
    dispatch(fetchUsers(response.data, convertHeadersToMetaList(response.headers)));
  })
  .catch(error => {
    throw (error);
  });