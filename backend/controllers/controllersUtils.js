import 'babel-polyfill';
import HttpStatus from 'http-status';
import escapeStringRegExp from 'escape-string-regexp';

import config from '../../config/config';

const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
  data,
  statusCode,
});

const errorResponse = (error, statusCode = HttpStatus.BAD_REQUEST) => ({
  error: JSON.parse(JSON.stringify(error)),
  statusCode,
});

const getPaginationParams = (req) => {
  const limit = parseInt(req.query.limit, 10) || config.query.limit;
  const page = parseInt(req.query.page, 10) || 1;
  const skip = (page - 1) * limit;
  return { limit, page, skip };
};

const getPageUrl = (metadata, page) => {
  const urlParams = {
    page,
    limit: metadata.limit,
    sort: metadata.sort,
    dir: metadata.dir,
  };

  Object.keys(metadata.filters).forEach((key) => {
    urlParams[key] = metadata.filters[key];
  });

  return `?${Object.keys(urlParams).map(key => `${key}=${encodeURIComponent(urlParams[key])}`).join('&')}`;
};

const getQueryParams = (req, params) => {
  const result = getPaginationParams(req);

  const sortColumn = req.query.sort || params.defaultSort;
  const sortDirection = parseInt(req.query.dir, 10) || 1;
  const sort = {};
  sort[sortColumn] = sortDirection;

  const projection = {};

  if (params.searchParams) {
    params.searchParams.forEach((key) => {
      if (req.query[key]) {
        projection[key] = {
          $regex: `.*${escapeStringRegExp(req.query[key])}.*`,
          $options: 'xis',
        };
      }
    });
  }

  if (params.filterParams) {
    params.filterParams.forEach((key) => {
      if (req.query[key]) {
        projection[key] = req.query[key];
      }
    });
  }

  return Object.assign(result, { sort, projection });
};

const formatError = result => (result.errors ?
  Object.keys(result.errors).reduce(
    (errors, key) => Object.assign(errors, { [key]: {
      type: result.errors[key].properties.type,
    } }), {}) :
  {
    [result.path]: {
      type: result.name,
    },
  });

const getMetadata = (req, params, count) => {
  let metadata = getPaginationParams(req);

  const totalPages = Math.ceil(count / metadata.limit);
  const sort = req.query.sort || params.defaultSort;
  const dir = parseInt(req.query.dir, 10) === -1 ? -1 : 1;

  const filters = {};

  if (params.searchParams) {
    params.searchParams.forEach((key) => {
      if (req.query[key]) {
        filters[key] = req.query[key];
      }
    });
  }

  if (params.filterParams) {
    params.filterParams.forEach((key) => {
      if (req.query[key]) {
        filters[key] = req.query[key];
      }
    });
  }

  metadata = Object.assign(metadata, { count, totalPages, sort, dir, filters });

  if (metadata.page > 1) {
    metadata.previousPage = getPageUrl(metadata, metadata.page - 1);
    metadata.firstPage = getPageUrl(metadata, 1);
  }

  if (metadata.page < totalPages) {
    metadata.nextPage = getPageUrl(metadata, metadata.page + 1);
    metadata.lastPage = getPageUrl(metadata, totalPages);
  }

  return metadata;
};

const standardGetById = async (Collection, req) => {
  try {
    return defaultResponse(await Collection.findOne({
      _id: req.params && req.params.id,
    }));
  } catch (error) {
    return errorResponse(null, HttpStatus.NOT_FOUND);
  }
};

const standardListView = async (Collection, req, configParams) => {
  const queryParams = getQueryParams(req, configParams);

  try {
    const data = await Collection.find(queryParams.projection)
      .skip(queryParams.skip)
      .limit(queryParams.limit)
      .sort(queryParams.sort);

    const count = await Collection.count(queryParams.projection);

    const metadata = getMetadata(req, configParams, count);

    return { metadata, data, statusCode: HttpStatus.OK };
  } catch (error) {
    return errorResponse(error);
  }
};

export default {
  defaultResponse,
  errorResponse,
  getQueryParams,
  formatError,
  getMetadata,
  standardGetById,
  standardListView,
};
