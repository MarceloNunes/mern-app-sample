import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Image, List} from 'semantic-ui-react';

export const UserListItem = ({ user: { _id, picture, firstName, lastName, email, location, dateOfBirth }}) => (
  <List.Item>
    <Image avatar size='tiny' verticalAlign='middle' src={ picture } />
    <List.Content>
      <List.Header as='a'>
        <Link to={`/users/${_id}`}>
          <h3>{ firstName } { lastName }</h3>
        </Link>
      </List.Header>
      <List.Description>
        { email }
      </List.Description>
      <List.Description>
        { location.street } &mdash; { location.city }, { location.state }
      </List.Description>
      <List.Description>
        Born in { moment(dateOfBirth).format('MMMM Do, YYYY') }
      </List.Description>
    </List.Content>
  </List.Item>
);

export default UserListItem;