import './models/users.model';
import './models/session.model';

import authRouter from './routes/auth.router';
import usersRouter from './routes/users.router';

import authorization from './auth';

export default (app) => {
  const auth = authorization(app);
  app.use(auth.initialize());
  app.auth = auth;

  authRouter(app);
  usersRouter(app);
};