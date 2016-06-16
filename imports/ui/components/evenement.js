import React from 'react';
import { Row, Col, ListGroupItem, FormControl, Button } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import { removeEvenement } from '../../api/evenements/methods.js';
var moment = require('moment');


const handleRemoveEvenement = (evenementId, event) => {
  event.preventDefault();
  // this should be replaced with a styled solution so for now we will
  // disable the eslint `no-alert`
  // eslint-disable-next-line no-alert
  if (confirm('Pas de retour en arrière possible. Confirmation ?')) {
    removeEvenement.call({
      _id: evenementId,
    }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Evénement effacé !', 'success');
      }
    });
  }
};

export const Evenements = ({ evenement }) => (
  <ListGroupItem key={ evenement._id }>
    <Row>
      <Col xs={ 8 } sm={ 10 }>
        <p>{ moment(evenement.start).format('dddd D MMMM YYYY') } </p>
      </Col>
      <Col xs={ 4 } sm={ 2 }>
        <Button
          bsStyle="danger"
          className="btn-block"
          onClick={ handleRemoveEvenement.bind(this, evenement._id) }>
          Remove
        </Button>
      </Col>
    </Row>
  </ListGroupItem>
);
