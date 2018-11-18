import path from 'path';
import config from '../../config/config';

const displayResult = (res, promise) => {
  promise.then((response) => {
    res.set(response.header);
    res.status(response.statusCode);
    res.json(response.data || response.error);
  });
};

const createUrl = (url) => {
  return path.normalize(`${config.baseUrl}/${url}`).replace('/', '').split('\\').join('/');
};

export default {
  displayResult,
  createUrl,
};
