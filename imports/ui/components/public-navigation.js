import React from 'react';
import { Modal } from 'react-bootstrap';
import { Nav, NavItem } from 'react-bootstrap';
import {LoginModal} from './loginModal';
import {Inscription} from './inscriptionModal';
import {Identification} from './identificationModal';

export const PublicNavigation = React.createClass({
      getInitialState() {
    return {
      showModalInscription: false,
      showModalIdentification: false
    }
      },
toggleModal: function (quelModal) {
  switch(quelModal) {
    case 'identification':
      this.setState({showModalIdentification: true});
      break;
    case 'inscription':
      this.setState({showModalInscription: true});
      break;
    default:
      break;
      
  }

},
close: function () {
  this.setState({showModalInscription: false, showModalIdentification: false})
},

render:function () {
  
  return (
    <div>
  <Nav pullRight>
    <NavItem eventKey={ 1 } onClick={() => this.toggleModal('inscription')}>S'inscrire</NavItem>
    <NavItem eventKey={ 2 } onClick={() => this.toggleModal('identification')}>S'identifier</NavItem>
  </Nav>
  <Modal show={this.state.showModalIdentification} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Connexion</Modal.Title>
          </Modal.Header>
 <Inscription fermer={this.close} type="connexion"/>
  </Modal>
    <Modal show={this.state.showModalInscription} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>S'inscrire</Modal.Title>
          </Modal.Header>
  <Inscription fermer={this.close} type="inscription"/>
  </Modal>
</div>
  )
}
});
