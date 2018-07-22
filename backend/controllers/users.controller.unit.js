import 'babel-polyfill';
import chai from 'chai';
import spies from 'chai-spies';
import '../models/users.model';
import UsersController from './users.controller';

export const userData = [
  { /* 0 */
    _id: '5b34595fb2d8be463e9d5aa4',
    email: 'ethan.addy@example.com',
    firstName: 'Ethan',
    lastName: 'Addy',
    locator: '59b244a4847aae7e0e649827e5a795a65094c9be4e54f5d9d350fad2ea205cef',
    "password":"0d89f29a6cc60ae0d1deba005a4a936b53a4b60943a716525b6d7abba1cc051f",
  }, { /* 1 */
    _id: '5b345a1b36a7f74764d0d088',
    email: 'fatih.akışık@example.com',
    firstName: 'Fatih',
    lastName: 'Akışık',
    password:"0d89f29a6cc60ae0d1deba005a4a936b53a4b60943a716525b6d7abba1cc051f",
  }, { /* 2 */
    _id: '5b345a2836a7f74764d0d1a8',
    email: 'ece.abacı@example.com',
    firstName: 'Ece',
    lastName: 'Abacı',
  }, { /* 3 */
    _id: '5b345a2836a7f74764d0d1d5',
    email: 'joel.ahola@example.com',
    firstName: 'Joel',
    lastName: 'Ahola',
  }, { /* 4 */
    _id: '5b345a3b36a7f74764d0d2b9',
    email: 'latife.adal@example.com',
    firstName: 'Latife',
    lastName: 'Adal',
  }
];

chai.use(spies);

let users;

describe('UserController:', () => {
  beforeEach(() => {
    users = new UsersController();
  });

  describe('getById()', () => {
    beforeEach(() => {
      chai.spy.restore(users.User);
    });

    it('should return an user by id', async () => {
      chai.spy.on(users.User, 'findOne',
        () => new Promise((resolve) => resolve(userData)));

      const result = await users.getById({ params: { id: userData._id } });

      chai.expect(users.User.findOne)
        .to.have.been.called.with({ _id: userData._id });

      chai.expect(result).to.deep.equal({
        data: userData,
        statusCode: 200,
      });
    });

    it('should return a 404 error if user not found', async () => {
      chai.spy.on(users.User, 'findOne',
        () => new Promise((resolve, reject) => reject()));

      const result = await users.getById({ params: { id: '1234' } });

      chai.expect(users.User.findOne)
        .to.have.been.called.with({ _id: '1234' });

      chai.expect(result).to.deep.equal({
        statusCode: 404,
      });
    });
  });

  describe('list()', () => {
    beforeEach(() => {
      chai.spy.restore(users.User);

      chai.spy.on(users.User, 'find', () => ({
        skip: () => ({
          limit: () => ({
            sort: () => new Promise((resolve) => resolve(userData))
          })
        })
      }));

    });

    it('should list users', async () => {
      chai.spy.on(users.User, 'count',
        () => new Promise((resolve) => resolve(userData.length)));

      const result = await users.list({ query: {} });

      chai.expect(users.User.find)
        .to.have.been.called.with({});

      chai.expect(result.data.map(user => user.lastName)).to.deep.equal(
        [ 'Addy', 'Akışık', 'Abacı', 'Ahola', 'Adal' ]
      );

      chai.expect(result.statusCode).to.equal(200);

      chai.expect(result.metadata).to.deep.equal({
        limit: 100,
        page: 1,
        skip: 0,
        count: 5,
        totalPages: 1,
        sort: 'lastName',
        dir: 1,
        filters: {}
      });
    });

    it('should list users sorted by firstName, on descending order', async () => {
      chai.spy.on(users.User, 'count',
        () => new Promise((resolve) => resolve(userData.length)));

      const result = await users.list({
          query: {
            sort: 'firstName',
            dir: -1
          }
      });

      chai.expect(result.metadata).to.deep.equal({
        limit: 100,
        page: 1,
        skip: 0,
        count: 5,
        totalPages: 1,
        sort: 'firstName',
        dir: -1,
        filters: {}
      });
    });

    it('should list users using allowed filters', async () => {
      chai.spy.on(users.User, 'count',
        () => new Promise((resolve) => resolve(userData.length)));

      const result = await users.list({
          query: {
            'firstName': 'John',
            'lastName': 'Doe',
            'foo': 'bar'
          }
      });

      chai.expect(result.metadata.filters).to.deep.equal({
        firstName: 'John',
        lastName: 'Doe'
      });
    });

    describe('When managing pagination', () => {
      beforeEach(() => {
        chai.spy.on(users.User, 'count',
        () => new Promise((resolve) => resolve(12345)));
      });

      it('should manage first pagemetadata', async () => {
        const result = await users.list({ query: {} });

        chai.expect(result.metadata).to.deep.equal({
          limit: 100,
          page: 1,
          skip: 0,
          count: 12345,
          totalPages: 124,
          sort: 'lastName',
          dir: 1,
          filters: {},
          nextPage: '?page=2&limit=100&sort=lastName&dir=1',
          lastPage: '?page=124&limit=100&sort=lastName&dir=1'
        });
      });

      it('should manage last page metadata', async () => {
        const result = await users.list({ query: {
          page: 124
        } });

        chai.expect(result.metadata).to.deep.equal({
          limit: 100,
          page: 124,
          skip: 12300,
          count: 12345,
          totalPages: 124,
          sort: 'lastName',
          dir: 1,
          filters: {},
          previousPage: '?page=123&limit=100&sort=lastName&dir=1',
          firstPage: '?page=1&limit=100&sort=lastName&dir=1'
        });
      });

      it('should manage middle page metadata', async () => {
        const result = await users.list({ query: {
          page: 62
        } });

        chai.expect(result.metadata).to.deep.equal({ limit: 100,
          page: 62,
          skip: 6100,
          count: 12345,
          totalPages: 124,
          sort: 'lastName',
          dir: 1,
          filters: {},
          previousPage: '?page=61&limit=100&sort=lastName&dir=1',
          firstPage: '?page=1&limit=100&sort=lastName&dir=1',
          nextPage: '?page=63&limit=100&sort=lastName&dir=1',
          lastPage: '?page=124&limit=100&sort=lastName&dir=1'
        });
      });

      it('should adjust page number lower than 1', async () => {
        const result = await users.list({ query: {
          page: 0
        } });

        chai.expect(result.metadata.page).to.equal(1);
      });

      it('should adjust to a different limit ', async () => {
        const result = await users.list({ query: {
          page: 30,
          limit: 123
        } });

        chai.expect(result.metadata).to.deep.equal({
          limit: 123,
          page: 30,
          skip: 3567,
          count: 12345,
          totalPages: 101,
          sort: 'lastName',
          dir: 1,
          filters: {},
          previousPage: '?page=29&limit=123&sort=lastName&dir=1',
          firstPage: '?page=1&limit=123&sort=lastName&dir=1',
          nextPage: '?page=31&limit=123&sort=lastName&dir=1',
          lastPage: '?page=101&limit=123&sort=lastName&dir=1'
        });
      });
    });
  });

  describe('insert()', () => {
    beforeEach(() => {
      chai.spy.restore(users.User);
    });

    it('should insert a single user', async () => {
      chai.spy.on(users.User, 'create',
        () => new Promise((resolve) => resolve(userData[0])));

      const result = await users.insert({
        body: userData[0]
      });

      chai.expect(result).to.deep.equal({
        data: {
          _id: '5b34595fb2d8be463e9d5aa4',
          email: 'ethan.addy@example.com',
          firstName: 'Ethan',
          lastName: 'Addy',
          password: '9e265e96d2d6e1e8aa1c801b2af5afc3ad652e91d468d0094ea7435801069b7a',
          locator: '17f07c18d76d84d0c83152bfeefc0b5b1a2061d012a3d69035a2b9018ffbbfca'
        },
        statusCode: 201
      });
    });

    it('should insert multiple users in one call', async () => {
      chai.spy.on(users.User, 'insertMany',
        () => new Promise((resolve) => resolve(
          [ userData[0], userData[1] ]
        )));

      const result = await users.insert({
        body: [ userData[0], userData[1] ]
      });

      chai.expect(result).to.deep.equal({
        data: [{
          _id: '5b34595fb2d8be463e9d5aa4',
          email: 'ethan.addy@example.com',
          firstName: 'Ethan',
          lastName: 'Addy',
          password: 'b6cfcb09a4f7959f0aa16cabee1d27b408b637095b3a7540085f5de93b1888be',
          locator: '736d7743281f5cec19803899f330a0802fcbf00b8c6a861d2ed1f646c7730035'
        }, {
          _id: '5b345a1b36a7f74764d0d088',
          email: 'fatih.akışık@example.com',
          firstName: 'Fatih',
          lastName: 'Akışık',
          password: '9e265e96d2d6e1e8aa1c801b2af5afc3ad652e91d468d0094ea7435801069b7a',
          locator: '88eed80903faa3d5ce0da18fb505a9a892c58e5b2a78a6a1ffe2e8051f985f82'
        }],
        statusCode: 201
      });
    });

    it('should report error on insert failure', async () => {
      chai.spy.on(users.User, 'create',
        () => new Promise((resolve, reject) => reject({
          errors: {
            email: { properties: { type: 'testError' } },
            firstName: { properties: { type: 'testError' } }
          }
        })));

      const result = await users.insert({
        body: userData[0]
      });

      chai.expect(result).to.deep.equal({
        error: {
          email: { type: 'testError' },
          firstName: { type: 'testError' }
        },
        statusCode: 422
      });
    });
  });

  describe('update()', () => {
    beforeEach(() => {
      chai.spy.restore(users.User);
    });

    it('should report error on update failure', async () => {
      chai.spy.on(users.User, 'update',
        () => new Promise((resolve, reject) => reject({
          errors: {
            email: { properties: { type: 'testError' } },
            firstName: { properties: { type: 'testError' } }
          }
        })));

      const result = await users.update({
        body: userData[0]
      });

      chai.expect(result).to.deep.equal({
        error: {
          email: { type: 'testError' },
          firstName: { type: 'testError' }
        },
        statusCode: 422
      });
    });
  });
});
