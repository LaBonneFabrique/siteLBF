import React from 'react';
import { Row, Col, ListGroupItem, FormControl, Button } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';


export const User = ({user}) => (
  <Row >
 <Col xs={ 12 } sm={ 2 } md={ 2 } className="pull-left">
 {user.profile.nom?user.profile.nom:'pas de nom !'}
 </Col>
 <Col xs={ 12 } sm={ 2 } md={ 2 } className="pull-left">
    {user.profile.prenom?user.profile.prenom:'pas de prénom !'}
  </Col>
   <Col xs={ 12 } sm={ 3 } md={ 3 } className="pull-left">
   {user.emails[0].address}
  </Col>
  </Row>
);

User.propTypes = {
    user: React.PropTypes.object,
}