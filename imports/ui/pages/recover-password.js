import React from 'react';
import { Row, Col, Alert, FormGroup, FormControl, Button } from 'react-bootstrap';
import { handleRecoverPassword } from '../../modules/recover-password';

export class RecoverPassword extends React.Component {
  componentDidMount() {
    handleRecoverPassword({ component: this });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return <Row>
      <Col xs={ 12 } sm={ 6 } md={ 4 }>
        <h4 className="page-header">Ré initialisation du mot de passe.</h4>
        <Alert bsStyle="info">
          Entrez votre adresse mail ci-dessous. Vous recevrez un mail vous permettant de ré-initialiser votre mot de passe.
        </Alert>
        <form ref="recoverPassword" className="recover-password" onSubmit={ this.handleSubmit }>
          <FormGroup>
            <FormControl
              type="email"
              ref="emailAddress"
              name="emailAddress"
              placeholder="Adresse Mail"
            />
          </FormGroup>
          <Button type="submit" bsStyle="success">Envoyer le lien</Button>
        </form>
      </Col>
    </Row>;
  }
}
