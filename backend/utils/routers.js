import path from 'path';
import config from '../../config/config';

const displayResult = (res, promise) => {
  promise.then((response) => {
    res.status(response.statusCode);
    res.json(response.data || response.error);
  });
};

const createUrl = (url) => {
  return path.join('/', config.baseUrl, url);
};

export default {
  displayResult,
  createUrl,
};
