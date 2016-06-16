import React from 'react';
import { Modal } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem } from 'react-bootstrap';
import {LoginModal} from './loginModal'

export const PublicNavigation = React.createClass({
      getInitialState() {
    return {
      showModal: false,
    }
      },
toggleModal: function (event) {

  this.setState({showModal: true})
},
close: function () {
  this.setState({showModal: false})
},

render:function () {
  
  return (
    <div>
  <Nav pullRight>
    <LinkContainer to="login">
      <NavItem eventKey={ 1 } onClick={this.toggleModal}>Connexion</NavItem>
    </LinkContainer>
  </Nav>
  <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Connexion</Modal.Title>
          </Modal.Header>
  <LoginModal />
  </Modal>
</div>
  )
}
});
