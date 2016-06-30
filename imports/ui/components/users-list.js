import React from 'react';
import { ListGroup, Alert, Row, Col } from 'react-bootstrap';
import {User} from './users.js';

export const UsersList = ({ users }) => (
  users.length > 0 ? <ListGroup className="users-list">
    <Row >
 <Col xs={ 12 } sm={ 2 } md={ 2 } className="pull-left">
 <h4>Nom</h4>
 </Col>
 <Col xs={ 12 } sm={ 2 } md={ 2 } className="pull-left">
    <h4>Prénom</h4>
  </Col>
   <Col xs={ 12 } sm={ 3 } md={ 3 } className="pull-left">
    <h4>Adresse mail</h4>
  </Col>
  </Row>
    {users.map((user) => (
      <User key={ user._id } user={ user } />
    ))}
  </ListGroup> :
  <Alert bsStyle="warning">Pas d'adhérent pour l'instant.</Alert>
);

UsersList.propTypes = {
  users: React.PropTypes.array,
};