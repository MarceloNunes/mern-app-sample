import UsersController from '../controllers/users.controller';
import utils from '../utils/routers';

export default (app) => {
  const usersController = new UsersController();

  app.route(utils.createUrl('/users'))
    .get((req, res) => utils.displayResult(res, usersController.list(req)))
    .post((req, res) => utils.displayResult(res, usersController.insert(req)));

  app.route(utils.createUrl('/users/:id'))
    .get((req, res) => utils.displayResult(res, usersController.getById(req)))
    .patch((req, res) => utils.displayResult(res, usersController.update(req)))
    .delete((req, res) => utils.displayResult(res, usersController.delete(req)));

  app.route(utils.createUrl('/users/password/:id'))
    .patch((req, res) => utils.displayResult(res, usersController.changePassword(req)));
};
