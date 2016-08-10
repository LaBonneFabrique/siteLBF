import React from 'react';
import { browserHistory, Link } from 'react-router';
//import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
//import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
//bascule materialize-ui
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
//import DropDownMenu from 'material-ui/DropDownMenu';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import IconMenu from 'material-ui/IconMenu';
//inlinegrid
import { Grid, Row, Cell } from 'react-inline-grid';

var FontAwesome = require('react-fontawesome');

const handleLogout = () => Meteor.logout(() => browserHistory.push('/'));

const userName = () => {
  const user = Meteor.user();
  const nom = user && user.profile ? user.profile.nom : '';
  const prenom = user && user.profile ? user.profile.prenom : '';
  return user && nom!='' && prenom!=''? `${prenom} ${nom}`:'bib';//`${name.first} ${name.last}` : '';
};

const isAdmin = () => {
  var retour = false;
  const user = Meteor.user();
  if (user.roles.find('admin')) retour=true;
  return retour;
};

const isCollege = () => {
  var retour = false;
  const user = Meteor.user();
  if (user.roles.find('college')) retour=true;
  return retour;
};

const isLogged = () => {
  var retour = false;
  if (Meteor.user()) retour = true;
  return retour;
};


  export  class AuthenticatedNavigation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 3,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(event, index, value) {
   this.setState({value});
  }
  
  handleLogout() {
    Meteor.logout(() => browserHistory.push('/'));
    } 
  
  render() {
    return(
    <Toolbar className="">
    <Grid>
    <Row is="end">
    <Cell is="2 offset-10">
          <IconMenu
            iconButtonElement={
              <FontAwesome name='gears' size="2x"/>
            }
          >
            <MenuItem
              containerElement={<Link to="/" />}
              linkButton={true}
              primaryText='Accueil'
              leftIcon={
                <FontAwesome name='home' size="2x" />
              }
            />
            <MenuItem 
              containerElement={<Link to="/pageAdherent" />}
              linkButton={true}
              primaryText='Tableau de bord' 
              leftIcon={
                <FontAwesome name='dashboard' size="2x" />
              }
              />
            <MenuItem 
              containerElement={<Link to="/agenda" />}
              linkButton={true}
              primaryText='Agenda' 
              leftIcon={
                <FontAwesome name='calendar' size="2x" />
              }
              />
            <MenuItem 
              containerElement={<Link to="/listeAdherents" />}
              linkButton={true}
              primaryText='Liste des adhérents' 
              leftIcon={
                <FontAwesome name='users' size="2x" />
              }
              />
            <MenuItem 
                onClick={ this.handleLogout }
                primaryText='Se déconnecter' 
                leftIcon={
                  <FontAwesome name='sign-out' size="2x" />
                }
                />
          </IconMenu>
          </Cell></Row>
      </Grid>
    </Toolbar>

      );
    
  }

}
