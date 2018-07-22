import AuthController from '../controllers/auth.controller';
import utils from '../utils/routers';

export default (app) => {
  const authController = new AuthController();

  app.route('/auth')
    .post((req, res) => utils.displayResult(res, authController.login(req)));
};
