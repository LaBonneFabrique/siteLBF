import React from 'react';
import { handleConnexion } from '../../modules/connexion';
import FontAwesome from 'react-fontawesome';
var ReactDOM = require('react-dom');
//bascule vers Material-ui
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

//inlinegrid
import { Grid, Row, Cell } from 'react-inline-grid';
const optionsGrid = {
  columns: 12,
  gutter: 16,
  margin: 0
};
//style formulaire
const styles = {
  floatingLabel: {
    margin: '0px',
    padding: '0px',
    margin: '0px',
    padding: '0px'
  },
  marginTop5: {
    marginTop: '5px'
  },
  marginTop10: {
    marginTop: '10px'
  },
 marginTop15: {
    marginTop: '15px'
  },
  centPourCent: {
    width: '100%',
    padding: '0px',
    margin: '0px'
  },
  border: {
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: 'black',
    padding: '0px',
    margin: '0px'
  },
  borderTextArea: {
    borderStyle: 'dashed',
    borderColor: 'rgb(92,92,92)',
    borderWidth: '1px'
  }
};

export class Connexion extends React.Component {
  constructor(props) {
    super(props);
    this.mailExists=this.mailExists.bind(this);
        this.state={
        foundUserServices:{},
        foundUser:false,
        type:""
    };
  }
  
componentDidMount() {
    handleConnexion({ component: this, service: this.state.foundUserServices });
    ReactDOM.findDOMNode(this.refs.emailAddress).focus();
  }
  
  componentDidUpdate() {
    handleConnexion({ component: this, service: this.state.foundUserServices });
  }

handleSubmit(event) {
    event.preventDefault();
  }

mailExists(event) {
  const emailAddress = event.target.value;
  const userExists = Meteor.users.findOne({ 'emails.address': emailAddress });
  if(userExists) {
      this.setState({foundUserServices: userExists.services, foundUser:true});
  } else {this.setState({foundUser: false})}
}
  
    render() {
        let mdp;
        let bouton;
        if (this.state.foundUserServices.password&&this.state.foundUser) {
            mdp = <TextField
            style={styles.centPourCent}
            type="password"
            ref="password"
            name="password"
            placeholder="Mot de passe"
            floatingLabelStyle={styles.floatingLabel}
          />
            bouton = <FlatButton 
                      label="Connexion" 
                      secondary={true} 
                      type="submit"
                      className="pull-right"
                      />;
     
        }
        if (this.state.foundUserServices.github&&this.state.foundUser) {
            bouton = <FlatButton 
                      label="Connexion avec Github" 
                      secondary={true} 
                      type="submit"
                      className="pull-right"
                      icon={<FontAwesome name="github" />}
                      />;
        }
        if (this.state.foundUserServices.twitter&&this.state.foundUser) {
            bouton = <FlatButton 
                      label="Connexion avec Twitter" 
                      secondary={true} 
                      type="submit"
                      className="pull-right"
                      icon={<FontAwesome name="twitter" />}
                      />;
        }
        
        if (this.state.foundUserServices.facebook&&this.state.foundUser) {
            bouton = <FlatButton 
                      label="Connexion avec Facebook" 
                      secondary={true} 
                      type="submit"
                      className="pull-right"
                      icon={<FontAwesome name="facebook" />}
                      />;
        }
    
    return (
    <Grid
        options={optionsGrid}
      >
     <Row is="nospace">
      <Cell is="10 phone-12 offset-2">
        <form ref="connexion" className="connexion" onSubmit={ this.handleSubmit }>
            <p>Merci d'entrer votre adresse mail et suivre les instructions qui suivront. Si rien de s'affiche, soit une erreur s'est glissée dans votre mail, soit vous avez besoin de vous inscrire sur le site.
                </p>
            <TextField
            style={styles.centPourCent}
            type="email"
            ref="emailAddress"
            name="emailAddress"
            placeholder="Entrer votre adresse mail"
            floatingLabelStyle={styles.floatingLabel}
            onChange={this.mailExists}
          />
            {mdp}
            {bouton}
        </form>
        </Cell>
        </Row>
        </Grid>
    );
  }
}