import React from 'react';
import { Row, Col, ListGroupItem, FormControl, Button } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';


export const User = ({user}) => (
  <ListGroupItem >
  {console.log(user)}
    {user.profile.name?user.profile.name.last:'pas de nom !'}
  </ListGroupItem>
);

User.propTypes = {
    user: React.PropTypes.object,
}