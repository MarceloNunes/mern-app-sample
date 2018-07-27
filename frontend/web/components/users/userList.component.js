import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllUsers } from '../../actions/users.action';

import { Container, List} from 'semantic-ui-react'
import UserListItem from './userListItem.component';

class UserList extends React.Component {
  constructor() {
    super(props);
    this.state = {};
  }

  componentWillMount(){
    this.props.selectUsers();
  }

  render() {
    return (
      <div>Hello!!</div>
    );
   }

}


// export const UserList = (props) => (
//   <Container text style={{ marginTop: '7em' }}>
//     <List relaxed='very' divided>
//     {
//       props.users.length === 0 ? (
//         <p>No user match the search criteria</p>
//       ) : (
//         props.users.map((user) => {
//           return <UserListItem key={user.id} {...user}/>;
//         })
//       )
//     }
//     </List>
//   </Container>
// );

// const mapStateToProps = (state) => ({
//   users: selectUsers()
// });

// export default connect(mapStateToProps)(UserList);