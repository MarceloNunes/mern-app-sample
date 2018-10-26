import HttpStatus from 'http-status';
import mongoose from 'mongoose';
import sha256 from 'sha256';

import utils from '../utils/controllers';

const hashPassword = password => sha256.x2(password);
const getLocator = (email, password) => sha256.x2(`${email.toLowerCase()}-${password}`);

export default class {
  constructor() {
    this.User = mongoose.model('users');
    this.Session = mongoose.model('sessions');
  }

  async login(req) {
    const checkRequired = utils.checkRequiredError('password', req.body.password,
      utils.checkRequiredError('email', req.body.email));

    if (checkRequired) {
      return utils.errorResponse(checkRequired, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const locator = getLocator(req.body.email, hashPassword(req.body.password));

    try {
      const user = await this.User.findOne({
        locator,
      });

      if (!user) {
        return utils.errorResponse(null, HttpStatus.UNAUTHORIZED);
      }

      const session = await this.Session.create({
        user: {
          _id: user._id,
          administrator: user.administrator,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          picture: user.picture
         },
         remoteAddress: req.connection.remoteAddress
      });

      console.log(session);

      return utils.defaultResponse(session, HttpStatus.OK);
    } catch (error) {
      return utils.errorResponse(error, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
