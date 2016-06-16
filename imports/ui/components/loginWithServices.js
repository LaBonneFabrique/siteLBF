import React from 'react';
import {Button, Row} from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import { Accounts } from 'meteor/accounts-base'

import { browserHistory } from 'react-router'

var services = [{
  service: 'github',
  texte: 'Connexion avec Github',
  dataSocialLogin: 'loginWithGithub'
}]

export const LoginWithServices = React.createClass({
  onClic: function(dataSocialLogin) {
    const options = {};
   
    Meteor[ dataSocialLogin ]( options, ( error ) => {
      if ( error ) {
        Bert.alert( error.message, 'danger' );
      } else {browserHistory.push('/agenda');}
    });
    

  
  },
  render: function() {
    return (<ul>
    {services.map((service) => (
    <li key={service.service}>
    <Button onClick={() => (this.onClic(service.dataSocialLogin))}> {service.texte} </Button>
    </li>
    ))}
    </ul>
    );
  }
  
})

