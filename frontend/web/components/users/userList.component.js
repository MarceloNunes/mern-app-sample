import React from 'react';
import { connect } from 'react-redux';
import { Container, List } from 'semantic-ui-react';
import { UserListItem } from './userListItem.component';

const UserList = ({ users }) => {
  return (
    <Container text style={{ marginTop: '7em' }}>
      <List relaxed='very' divided>
        {users.map(user => (
          <UserListItem user={ user } />
        ))}
      </List>
    </Container>
  )
};

const mapStateToProps = state => ({
  users: state.users
});

const mapDispatchToProps = dispath => ({

});

// export default UserList;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList);