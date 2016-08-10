import React from 'react';
import { handleInscription } from '../../modules/inscription';
import FontAwesome from 'react-fontawesome';
//bascule vers Material-ui
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
//inlinegrid
import { Grid, Row, Cell } from 'react-inline-grid';

const optionsGrid = {
  columns: 12,
  gutter: 16,
  margin: 0
};
//style formulaire
const styles = {
checkbox: {
  display:"inline-block",
  width: '30%',
  marginRight: '3%'
},
  centPourCent: {
    width: '100%',
    padding: '0px',
    margin: '0px'
  }
};

export class Inscription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      services: true,
      donnees: {}
    };
    this.toggleChekboxService=this.toggleChekboxService.bind(this)
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
  
  toggleChekboxService(event, value) {
    var etat = !this.state.services;
    setTimeout(() =>this.setState ({services: etat}));
  }
  
  render() {
   
      const  renderTypeFormulaire =  this.state.services ?
      <div>
      <p>Choisissez l'un des services suivants pour vous inscrire :</p>
      <RadioButtonGroup name="service">
          <RadioButton
            value="loginWithFacebook"
            label="Facebook"
            style={styles.checkbox}
            uncheckedIcon={<FontAwesome name="facebook" size="2x"/>}
          />
          <RadioButton
            value="loginWithTwitter"
            label="Twitter"
            style={styles.checkbox}
            uncheckedIcon={<FontAwesome name="twitter" size="2x"/>}
          />
          <RadioButton
            value="loginWithGithub"
            label="Github"
            style={styles.checkbox}
            uncheckedIcon={<FontAwesome name="github" size="2x"/>}
          />
          
          </RadioButtonGroup>
     </div>
        : 
        <div>
        <Row is="nospace">
          <Cell is="12">
        <TextField
            style={styles.centPourCent}
            type="password"
            ref="password"
            name="password"
            placeholder="Mot de passe"
            floatingLabelStyle={styles.floatingLabel}
          /></Cell></Row>
          <Row is="nospace">
          <Cell is="12">
        <TextField
            style={styles.centPourCent}
            type="password"
            ref="passwordVerif"
              name="passwordVerif"
              placeholder="Vérification du mot de passe"
            floatingLabelStyle={styles.floatingLabel}
          /></Cell></Row>
         </div>;

    
    
    return (
        <Grid
            options={optionsGrid}
          >
        <form ref="inscription" className="inscription" onSubmit={ this.handleSubmit }>
          <Row is="nospace">
          <Cell is="6 phone-12">
          <TextField
                style={styles.centPourCent}
                type="text"
                ref="prenom"
                name="prenom"
                placeholder="Prénom"
              />
          </Cell>
          <Cell is="6 phone-12">
             <TextField
                style={styles.centPourCent}
                type="text"
                ref="nom"
                name="nom"
                placeholder="Nom"
              />
          </Cell></Row>
        <Row is="nospace"><Cell is="12">
        <TextField
            style={styles.centPourCent}
            type="email"
            ref="emailAddress"
            name="emailAddress"
            placeholder="Adresse Mail"
          />
          </Cell></Row>
          <Row is="nospace"><Cell is="12">
        <Checkbox
          label="Ne pas utiliser Facebook, Twitter ou Github"
          style={styles.centPourCent}
          onCheck={this.toggleChekboxService}
          ref="choix"
          name="choix"
        />
        </Cell></Row>

          {renderTypeFormulaire}

          <Row is="end"><Cell is="12">
        <FlatButton
          type="submit"
          label="S'inscrire"
          labelPosition="before"
          primary={true}
          style={styles.button}
                  />
        </Cell></Row>
        </form>
      </Grid>


    );
  }
}
