import HttpStatus from 'http-status';
import mongoose from 'mongoose';
import sha256 from 'sha256';

import utils from './controllersUtils';

const searchParams = ['firstName', 'lastName', 'email', 'location.zipCode'];
const defaultSort = 'lastName';
const updatableColumns = ['firstName', 'lastName', 'active', 'email',
  'title', 'gender', 'dateOfBirth', 'location.street', 'picture', 'phones'];

const hashPassword = password => sha256.x2(password);
const getLocator = (email, password) => sha256.x2(`${email.toLowerCase()}-${password}`);

const hashDocument = (data) => {
  const user = data;

  if (user && user.password) {
    user.email = user.email.toLowerCase();
    user.password = hashPassword(user.password);
    user.locator = getLocator(user.email, user.password);
  }

  return user;
};

export default class {
  constructor() {
    this.User = mongoose.model('users');
  }

  getById(req) {
    return utils.standardGetById(this.User, req);
  }

  list(req) {
    return utils.standardListView(this.User, req, { searchParams, defaultSort });
  }

  async insert(req) {
    try {
      const insertData = req.body.length ?
        await this.User.insertMany(req.body.map(user => hashDocument(user))) :
        await this.User.create(hashDocument(req.body));

      return utils.defaultResponse(insertData, HttpStatus.CREATED);
    } catch (error) {
      return utils.errorResponse(utils.formatError(error), HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async update(req) {
    const setParams = updatableColumns.reduce((result, key) => {
      const keyObject = req.body[key] !== undefined ? { [key]: req.body[key] } : {};
      return Object.assign(result, keyObject);
    }, {});

    try {
      await this.User.update(
        { _id: req.params && req.params.id },
        { $set: setParams },
        { runValidators: true },
      );

      const updatedUser = await this.User.findOne({
        _id: req.params && req.params.id,
      });

      return utils.defaultResponse(updatedUser, HttpStatus.OK);
    } catch (error) {
      return utils.errorResponse(utils.formatError(error), HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  changePassword(req) {
    return this.User.findOne({
      _id: req.params && req.params.id,
    })
      .then((result) => {
        const password = hashPassword(req.body.password);
        const locator = getLocator(result.email, password);

        return this.User.update({
          _id: req.params && req.params.id,
        }, {
          $set: { password, locator },
        });
      })
      .then(result => utils.defaultResponse(result))
      .catch(error => utils.errorResponse(error.message));
  }

  delete(req) {
    return this.User.deleteOne({
      _id: req.params && req.params.id,
    })
      .then(result => utils.defaultResponse(result))
      .catch(error => utils.errorResponse(error.message));
  }
}
