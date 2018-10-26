import './models/users.model';
import './models/session.model';

import authRouter from './routes/auth.router';
import usersRouter from './routes/users.router';

export default(app) => {
  authRouter(app);
  usersRouter(app);
};