import React from 'react';
import { ListGroup, Alert } from 'react-bootstrap';
import {User} from './users.js';

export const UsersList = ({ users }) => (
  users.length > 0 ? <ListGroup className="users-list">
    {users.map((user) => (
      <User key={ user._id } user={ user } />
    ))}
  </ListGroup> :
  <Alert bsStyle="warning">No documents yet.</Alert>
);

UsersList.propTypes = {
  users: React.PropTypes.array,
};