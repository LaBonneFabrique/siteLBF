import React from 'react';
import {Panel, Col, Row} from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import {ModalReglageService} from './modalReglageService'

const titreCivilite = (
    <h3>Civilité</h3>
    )

export class PageAdherent extends React.Component {
    
    constructor(props) {
    super();
    
  }
  
  componentDidMount() {

  }
    
    render () {
        var loggedUser = this.props.loggedUser;
        return (
    <div ref="pageAdherent">
    <Row>
    <Col xs={12} sm={4}>
    <Panel header={titreCivilite}>
    <Row>
    <Col xs={8} sm={8}><b>Nom</b></Col>
    <Col xs={4} sm={4}>{this.props.loggedUser.profile.nom}</Col>
    </Row>
        <Row>
    <Col xs={8} sm={8}><b>Prénom</b></Col>
    <Col xs={4} sm={4}>{loggedUser.profile.prenom}</Col>
    </Row>
           <Row>
    <Col xs={8} sm={8}><b>Date d'adhésion</b></Col>
    <Col xs={4} sm={4}>~</Col>
    </Row>
               <Row>
    <Col xs={8} sm={8}><b>Type d'adhésion</b></Col>
    <Col xs={4} sm={4}>Famille</Col>
    </Row>
    </Panel>
    </Col></Row>
    {loggedUser.reglageService?null:<ModalReglageService user={loggedUser} />}
    </div>
    )
    }
};

PageAdherent.propTypes = {
    loggedUser: React.PropTypes.object
}
