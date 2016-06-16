import React from 'react';
import { Link } from 'react-router';
import { Row, Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { handleLogin } from '../../modules/login';
import LoginWithServices from '../containers/loginWithServices';
import {Modal} from 'react-bootstrap';


export class LoginModal extends React.Component {
  componentDidMount() {
    handleLogin({ component: this });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
    <Modal.Body>
    <Row>
    <Col xs={ 12 } sm={ 2 } md={ 2 }></Col>
      <Col xs={ 12 } sm={ 8 } md={ 8 }>
        <form ref="login" className="login" onSubmit={ this.handleSubmit }>
          <FormGroup>
            <ControlLabel>Adresse mail</ControlLabel>
            <FormControl
              type="email"
              ref="emailAddress"
              name="emailAddress"
              placeholder="Adresse mail"
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>
              <span className="pull-left">Mot de passe</span>
              <Link className="pull-right" to="/recover-password">Un oubli ?</Link>
            </ControlLabel>
            <FormControl
              type="password"
              ref="password"
              name="password"
              placeholder="Mot de passe"
            />
          </FormGroup>
          <Button type="submit" bsStyle="success" className="pull-right">Connexion</Button>
        </form>
        </Col>
          <Col xs={ 12 } sm={ 2 } md={ 2 }></Col>
        </Row>
        <Row>
    <Col xs={ 12 } sm={ 2 } md={ 2 }></Col>
      <Col xs={ 12 } sm={ 8 } md={ 8 }>
        <h4>Ou connectez-vous aves les services suivants</h4>
            <LoginWithServices />
  </Col>
          <Col xs={ 12 } sm={ 2 } md={ 2 }></Col>
    </Row></Modal.Body>
    )
  }
}
