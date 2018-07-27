import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LoginPage from '../components/login.component';
import UserListPage from '../components/users/userListPage.component';

const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={LoginPage} exact={true} />
      <Route path="/login" component={LoginPage} />
      <Route path="/users" component={UserListPage} />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;