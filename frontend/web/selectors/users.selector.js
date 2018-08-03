import axios from 'axios';
import config from '../../../config/config';
import { fetchUsers } from  '../actions/Users.actions';

const apiUrl = config.baseUrl + '/users';

export const fetchAllUsers = () =>
  (dispatch) => axios.get(apiUrl)
    .then(response => {
      dispatch(fetchUsers(response.data));
    })
    .catch(error => {
      throw(error);
    });
