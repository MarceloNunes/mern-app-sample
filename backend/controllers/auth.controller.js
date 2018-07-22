import HttpStatus from 'http-status';
import mongoose from 'mongoose';
import sha256 from 'sha256';

import utils from '../utils/controllers';

const hashPassword = password => sha256.x2(password);
const getLocator = (email, password) => sha256.x2(`${email.toLowerCase()}-${password}`);

export default class {
  constructor() {
    this.User = mongoose.model('users');
  }

  async login(req) {
    const locator = getLocator(req.body.email, hashPassword(req.body.password));

    try {
      const user = await this.User.findOne({
        locator,
      });

      if (!user) {
        return utils.errorResponse(null, HttpStatus.UNAUTHORIZED);
      }

      return utils.defaultResponse(user, HttpStatus.OK);
    } catch (error) {
      return utils.errorResponse(error, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
