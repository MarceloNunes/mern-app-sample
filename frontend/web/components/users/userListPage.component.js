import React from 'react';

import { MainMenu } from '../core/mainMenu.component';
import UserList from './userList.component';

export const UserListPage = () => (
  <div>
    <MainMenu />
    <UserList />
  </div>
);

export default UserListPage;