import AuthController from '../controllers/auth.controller';
import utils from '../utils/routers';

export default (app) => {
  const authController = new AuthController();

  app.route(utils.createUrl('/auth'))
    .post((req, res) => utils.displayResult(res, authController.login(req)));

  app.route(utils.createUrl('/auth/logout'))
    .all(app.auth.authenticate())
    .get((req, res) => utils.displayResult(res, authController.logout(req)));
};