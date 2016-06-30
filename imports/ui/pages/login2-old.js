import React from 'react';
import { Link } from 'react-router';
import { Row, Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import LoginWithServices from '../containers/loginWithServices'
import UsersList from '../containers/users-list'

export const Login = React.createClass({
  render() {
    return   (<Row >
    <UsersList />
    <Col xs={12} sm={6}>
      <div class="page-header">
        <h3>Sign In to DCS</h3>
        <p>Hey there team maties! Come on aboard!</p>
      </div>
      <LoginWithServices />
      </Col>
  </Row>
  );
  }
});
