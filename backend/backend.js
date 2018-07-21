import './models/usersModel';

import usersRouter from './routes/usersRouter';

export default(app) => {
  usersRouter(app);
};