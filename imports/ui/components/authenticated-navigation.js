import React from 'react';
import { browserHistory } from 'react-router';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';

const handleLogout = () => Meteor.logout(() => browserHistory.push('/'));

const userName = () => {
  const user = Meteor.user();
  const nom = user && user.profile ? user.profile.nom : '';
  const prenom = user && user.profile ? user.profile.prenom : '';
  return user && nom!='' && prenom!=''? `${prenom} ${nom}`:'bib';//`${name.first} ${name.last}` : '';
};

export const AuthenticatedNavigation = () => (
  <div>
    <Nav>
      <IndexLinkContainer to="/">
        <NavItem eventKey={ 1 } href="/">Index</NavItem>
      </IndexLinkContainer>
      <LinkContainer to="/pageAdherent">
        <NavItem eventKey={ 2 } href="/pageAdherent">Tableau de bord</NavItem>
      </LinkContainer>
      <LinkContainer to="/agenda">
        <NavItem eventKey={ 3 } href="/agenda">Agenda</NavItem>
      </LinkContainer>
    </Nav>
    <Nav pullRight>
      <NavDropdown eventKey={ 5 } title={ userName() } id="basic-nav-dropdown">
        <MenuItem eventKey={ 5.1 } onClick={ handleLogout }>Logout</MenuItem>
      </NavDropdown>
    </Nav>
  </div>
);
