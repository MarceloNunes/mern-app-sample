import React from 'react';
import { connect } from 'react-redux';
import { Container, Header, Icon, List, Pagination } from 'semantic-ui-react';
import { UserListItem } from './userListItem.component';
import { fetchAllUsers } from '../../selectors/Users.selector';

export class UserList extends React.Component {
  constructor() {
    super();

    this.handlePaginationChange = (e, { activePage }) => {
      this.props.onLoadUsers({
        activePage,
      });
    }
  }

  componentDidMount() {
    this.props.onLoadUsers();
  }

  render() {
    return (
      <Container text style={{ marginTop: '7em' }}>
        <Header as='h1' dividing>
          Users
        </Header>
        <Pagination
          activePage={this.props.users.metadata && this.props.users.metadata.page}
          totalPages={this.props.users.metadata && this.props.users.metadata.totalPages}
          ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
          firstItem={{ content: <Icon name='angle double left' />, icon: true }}
          lastItem={{ content: <Icon name='angle double right' />, icon: true }}
          prevItem={{ content: <Icon name='angle left' />, icon: true }}
          nextItem={{ content: <Icon name='angle right' />, icon: true }}
          onPageChange={this.handlePaginationChange}
        />
        <List relaxed='very' divided>
          {this.props.users && this.props.users.data && this.props.users.data.map(user => (
            <UserListItem user={ user } />
          ))}
        </List>
      </Container>
    );
  }
};

const mapDispatchToProps = (dispatch) => ({
  onLoadUsers: (params) => dispatch(fetchAllUsers(params))
});

const mapStateToProps = state => ({
  users: state.users
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList);