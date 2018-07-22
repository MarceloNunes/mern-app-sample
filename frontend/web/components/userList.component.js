import React from 'react';
import { Button, Segment } from 'semantic-ui-react'

export const UserListPage = () => (
  <div>
    <h1>
      List of Users!!!!!
      <Segment>
        <Button primary>Click Here!</Button>
        <Button secondary>Secondary Button</Button>
      </Segment>
    </h1>
  </div>
);

export default UserListPage;