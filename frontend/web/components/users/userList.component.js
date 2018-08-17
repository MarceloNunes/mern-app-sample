import React from 'react';
import { connect } from 'react-redux';
import { UserListItem } from './userListItem.component';
import { fetchAllUsers } from '../../selectors/Users.selector';

import {
  Container,
  Dimmer,
  Divider,
  Dropdown,
  Grid,
  Icon,
  Input,
  List,
  Loader,
  Message,
  Pagination,
  Segment,
} from 'semantic-ui-react';

export class UserList extends React.Component {

  state = {
    loading: false,
    initialized: false,
  };

  itemsPerPageOptions = [
    { key: 1, text: '10', value: 10 },
    { key: 2, text: '25', value: 25 },
    { key: 3, text: '50', value: 50 },
    { key: 4, text: '100', value: 100 },
  ];

  sortByOptions = [
    { key: 1, text: 'First Name', value: 'firstName' },
    { key: 2, text: 'Last Name', value: 'lastName' },
    { key: 3, text: 'E-mail', value: 'email' },
    { key: 3, text: 'Birth date', value: 'dateOfBirth' },
  ];

  getMetadata = ({ activePage, limit, firstName, lastName, email, sortBy, dir, or }, params) =>
    Object.assign({ activePage, limit, firstName, lastName, email, sortBy, dir, or }, params);

  componentDidMount() {
    this.reloadUsers({});
  }

  reloadUsers(params, force) {
    if (!this.state.loading) {
      this.setState((prevState) => Object.assign(prevState, {
        loading: true
      }));

      this.props.onLoadUsers(this.getMetadata(this.props.usersMeta, params)).then(() => {
        this.setState((prevState) => Object.assign(prevState, {
          loading: false,
          initialized: true
        }));

        if (this.state.nextParams) {
          setTimeout(() => {
            console.log('nextParams = ', this.state.nextParams);
            this.reloadUsers(this.state.nextParams);

            this.setState((prevState) => Object.assign(prevState, {
              nextParams: undefined,
            }));
          }, 100);
        }
      });
    } else {
      this.setState((prevState) => Object.assign(prevState, {
        nextParams: params
      }));
    }
  }

  handlePaginationChange = (e, { activePage }) => {
    this.reloadUsers({
      activePage
    });
  }

  handleItemPerPageChange = (e, { value }) => {
    this.reloadUsers({
      activePage: 1,
      limit: value,
    });
  }

  handleSearchInputChange = (e, { value }) => {
    this.reloadUsers({
      activePage: 1,
      or: true,
      firstName: value,
      lastName: value,
    });
  }

  handleSortByChange = (e, { value}) => {
    this.reloadUsers({
      activePage: 1,
      sortBy: value,
    });
  }

  render() {
    return (
      <Container text style={{ marginTop: '5em' }}>
        {
          !this.state.initialized &&
          <Dimmer page active inverted>
            <Loader
              content='Loading'
              size='big' />
          </Dimmer>
        }

        <Grid columns={4} verticalAlign='bottom'>
          <Grid.Row>
            <Grid.Column as='h1' width={6}>
              Users
            </Grid.Column>
            <Grid.Column width={6}>
              <Input
                icon='search'
                fluid
                loading={false}
                placeholder='Search...'
                onChange={this.handleSearchInputChange}
              />
            </Grid.Column>
            <Grid.Column width={4}>
              {
                this.props.usersMeta.sortBy &&
                <div>
                  <label>Sort By</label>
                  <Dropdown
                    placeholder='Sort by'
                    selection
                    fluid
                    options={this.sortByOptions}
                    defaultValue={this.props.usersMeta.sortBy}
                    onChange={this.handleSortByChange}
                  />
                </div>
              }
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider />
        <Dimmer.Dimmable as={Container} dimmed={this.state.loading}>
          <List relaxed='very' divided>
            {this.props.users && this.props.users.map(user => (
              <UserListItem user={ user } />
            ))}
          </List>
          {
            this.state.initialized && this.props.users && this.props.users.length === 0 &&
            <Message warning>
              <Message.Header>No users found</Message.Header>
              <p>Check your serach criteria and try again.</p>
            </Message>
          }
          <Dimmer
            active={this.state.loading}
            inverted
            verticalAlign='top'
          >
            <Loader
              content='Loading'
              size='big' />
          </Dimmer>
        </Dimmer.Dimmable>

        {
          this.props.users && this.props.usersMeta.count > 10 &&
          <div>
            <Divider />
            <Grid columns={2} verticalAlign='bottom'>
              <Grid.Row>
                <Grid.Column width={12}>
                  {
                    this.props.usersMeta && this.props.usersMeta.totalPages > 1 &&
                    <Pagination
                      activePage={this.props.usersMeta.activePage}
                      totalPages={this.props.usersMeta.totalPages}
                      ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
                      firstItem={{ content: <Icon name='angle double left' />, icon: true }}
                      lastItem={{ content: <Icon name='angle double right' />, icon: true }}
                      prevItem={{ content: <Icon name='angle left' />, icon: true }}
                      nextItem={{ content: <Icon name='angle right' />, icon: true }}
                      onPageChange={this.handlePaginationChange}
                    />
                  }
                </Grid.Column>
                <Grid.Column width={4}>
                  {
                    this.props.usersMeta && this.props.usersMeta.limit &&
                      <div>
                        <label>Items per page</label>
                        <Dropdown
                          placeholder='Items per page'
                          selection
                          fluid
                          options={this.itemsPerPageOptions}
                          defaultValue={this.props.usersMeta.limit}
                          onChange={this.handleItemPerPageChange}
                        />
                      </div>
                  }
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        }
      </Container>
    );
  }
};

const mapDispatchToProps = (dispatch) => ({
  onLoadUsers: (params) => dispatch(fetchAllUsers(params))
});

const mapStateToProps = state => ({
  users: state.users,
  usersMeta: state.usersMeta,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList);