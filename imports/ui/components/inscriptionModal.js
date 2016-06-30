import React from 'react';
import { Row, Col, FormGroup, ControlLabel, FormControl, Button, Checkbox, Radio } from 'react-bootstrap';
import { handleInscription } from '../../modules/inscription';
import {Modal} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

export class Inscription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      services: true,
      donnees: {}
    };
  }
  
  componentDidMount() {
    handleInscription({ component: this, type: this.props.type });
  }
  
  componentDidUpdate() {
    handleInscription({ component: this, type: this.props.type });
  }

  handleSubmit(event) {
    event.preventDefault();
  }
  
  toggleChekboxService() {
    var etat = !this.state.services;
    this.setState ({services: etat});
  }
  
  renderMDPVerif() {
    if (this.props.type=="inscription") {
      return (
                          <Row>
              <ControlLabel>
              <span className="pull-left">Vérification du mot de passe</span>
            </ControlLabel>
            <FormControl
              type="password"
              ref="passwordVerif"
              name="passwordVerif"
              placeholder="Vérification du mot de passe"
            />
        </Row>
        )
    } else {
      return(
        <Row ><Col smOffset={6} sm={5} className="pull-right"> <a href="oubliMDP"><b>Mot de passe oublié ?</b></a></Col></Row>
        )}
  }
  
  renderNomPrenom() {
    if (this.props.type=="inscription")  {
    return (
              <Row>
<Col xs={ 12 } sm={ 6 } md={ 6 }>
<FormGroup>
            <ControlLabel>Prénom</ControlLabel>
            <FormControl
              type="text"
              ref="prenom"
              name="prenom"
              placeholder="Prénom"
            />
          </FormGroup>
</Col>
<Col xs={ 12 } sm={ 6 } md={ 6 }>
<FormGroup>
            <ControlLabel>Nom</ControlLabel>
            <FormControl
              type="text"
              ref="nom"
              name="nom"
              placeholder="Nom"
            />
          </FormGroup>
</Col>
</Row>
      )
    } else return ("");
  }
  
  renderTypeFormulaire() {
    if (this.state.services) {
      return(
        <FormGroup name="groupeRadio" ref="loginWithService">
        <p>Choisissez l'un des services suivants pour vous inscrire</p>
       <Col xs={ 12 } sm={ 12 } md={ 4 }> 
      <Radio name="service" value="loginWithFacebook"><FontAwesome name="facebook" /> Facebook</Radio>
      </Col>
      <Col xs={ 12 } sm={ 12 } md={ 4 }> 
      <Radio name="service" value="loginWithTwitter"><FontAwesome name="twitter" /> Twitter</Radio>
      </Col>
      <Col xs={ 12 } sm={ 12 } md={ 4 }> 
      <Radio name="service" value="loginWithGithub"><FontAwesome name="github" /> Github</Radio>
      </Col>
      </FormGroup>
      );
    } else {
      return( 
                  <FormGroup ref="loginWithPassword">
                  <Row>
            <ControlLabel>
              <span className="pull-left">Mot de passe</span>
            </ControlLabel>
            <FormControl
              type="password"
              ref="password"
              name="password"
              placeholder="Mot de passe"
            />
            </Row>

      {this.renderMDPVerif()}

          </FormGroup>
        );
    }
  }
  
  render() {
    return (
    <Modal.Body>
     <Row>
    <Col xs={ 12 } sm={ 1 } md={ 1 }></Col>
      <Col xs={ 12 } sm={ 10 } md={ 10 }>
        <form ref="inscription" className="inscription" onSubmit={ this.handleSubmit }>
        {this.renderNomPrenom()}
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
         <Checkbox onChange={this.toggleChekboxService.bind(this)} ref="choix" name="choix" defaultValue="checked">Ne pas utiliser Facebook, Twitter ou Github</Checkbox>
         </FormGroup>
      {this.renderTypeFormulaire()}

          
        <Button type="submit" bsStyle="warning" className="pull-right btn-spaceTop">{this.props.type=="inscription"?"S'inscrire":"Connexion"}</Button> 
        </form>
        </Col>
        </Row>
   </Modal.Body>
    )
  }
}
