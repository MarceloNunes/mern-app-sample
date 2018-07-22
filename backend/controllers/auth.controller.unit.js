import 'babel-polyfill';
import chai from 'chai';
import spies from 'chai-spies';
import '../models/users.model';
import AuthController from './auth.controller';
import { userData } from './users.controller.unit';


chai.use(spies);

let authCtrl;

describe('AuthController:', () => {
  describe('login()', () => {
    beforeEach(() => {
      authCtrl = new AuthController();
      chai.spy.restore(authCtrl.User);
    });

    it('should authenticate user using a locator generated from email and password', async () => {
      chai.spy.on(authCtrl.User, 'findOne',
        () => new Promise((resolve) => resolve(userData[0])));

      const result = await authCtrl.login({
        body: {
          email: 'ethan.addy@example.com',
          password: 'abc123'
        }
      });

      chai.expect(authCtrl.User.findOne)
        .to.have.been.called.with({
          locator: '59b244a4847aae7e0e649827e5a795a65094c9be4e54f5d9d350fad2ea205cef',
        });

      chai.expect(result).to.deep.equal({
        data: userData[0],
        statusCode: 200
      });
    });

    it('should return unauthorized status when authentication fails', async () => {
      chai.spy.on(authCtrl.User, 'findOne',
        () => new Promise((resolve) => resolve(null)));

      const result = await authCtrl.login({
        body: {
          email: 'ethan.addy@example.com',
          password: 'abc123'
        }
      });

      chai.expect(result).to.deep.equal({ statusCode: 401 });
    });

    it('should return unprocessable entity on any other error', async () => {
      chai.spy.on(authCtrl.User, 'findOne',
        () => new Promise((response, reject) => reject('Test error')));

      const result = await authCtrl.login({
        body: {
          email: 'ethan.addy@example.com',
          password: 'abc123'
        }
      });

      chai.expect(result).to.deep.equal({
        statusCode: 422,
        error: 'Test error'
      });
    });
  });
});
