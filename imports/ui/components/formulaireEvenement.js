import React from 'react';
import {FormGroup, ControlLabel, FormControl, HelpBlock, Col, Row, Checkbox, Button, Glyphicon} from 'react-bootstrap';
var FontAwesome = require('react-fontawesome');
var moment = require('moment');
moment.locale('fr');
    var marges = 5;

var ListeCreneaux = React.createClass(
  {
    handleClickMoins: function (i) {
      this.props.siRetraitCreneau(i);
    },
    handleClickPlus: function () {
      this.props.siAjoutCreneau();
    },
    render: function()  {

    var self = this;

    var liste = this.props.creneaux.map(function(creneau, index) {
    if(index>=1) {
       var bouton = <Col xs={12} sm={1}>
          <Button onClick={() => self.handleClickMoins(index)}><FontAwesome name='minus' /></Button>
        </Col>
     } else {
       var bouton = <Col xs={12} sm={1}>
          <Button onClick={() => self.handleClickPlus()}><FontAwesome name='plus' /></Button>
        </Col>;
     }
      return (
      <Row key={index} style={{marginBottom: marges+'px'}} >
      <Col xs={12} sm={3}>
          <FormControl
            type='text'
            name='creneauHoraire'
            defaultValue={creneau.horaire} 
            key = 'horaire-{index}'
            />
      </Col>
        
      <Col xs={12} sm={2}>
          <FormControl
            type='text' 
            defaultValue={creneau.places} 
            key = 'places-{index}'
            />
      </Col>
        
      <Col xs={12} sm={2}>
          <FormControl
            type='text'
            defaultValue={creneau.inscrits} 
            key = 'inscrits-{index}'
            disabled
            />
      </Col>
    
      {bouton}
      
      </Row>

        )
      
    });

    return (
      <FormGroup>
        {liste}
      </FormGroup>
      )
    }
  });

export const FormulaireEvenement = React.createClass({
getInitialState() {
    return {
     creneaux: this.props.evenement.creneaux,
     journee: false,
     totalPlaces: 8
    };
  },
  
  calculPlaces: function(listeCreneaux) {
    var nbPlaces = 0
    listeCreneaux.forEach(function(creneau) {
      nbPlaces=nbPlaces+creneau.places;
    })

    return nbPlaces;
  },

  handleRetraitCreneau(i) {
  var listeCreneaux =this.state.creneaux;
  var creneauRetire = listeCreneaux.splice(i,1);
  var nbPlaces = this.calculPlaces(listeCreneaux)
  this.setState({creneaux:listeCreneaux, journee: this.state.journee, totalPlaces: nbPlaces});
  },
  
  handleAjoutCreneau() {
    var placeRandom = Math.floor((Math.random() * 10) + 1);
    var listeCreneaux =this.state.creneaux;
    var nbCreneaux = listeCreneaux.push({horaire: "14h01-18h00",
                places: placeRandom,
                inscrits: 0});
    var nbPlaces = this.calculPlaces(listeCreneaux);
    this.setState({creneaux:listeCreneaux, journee: this.state.journee, totalPlaces: nbPlaces});
  },
  
  checkBoxChanged: function() {
    var change=true;
    this.state.journee?change=false:change=true;
    this.setState({creneaux:this.state.creneaux, journee: change, totalPlaces: this.state.totalPlaces});
  },
  
  render: function() {
    console.log(this.state.totalPlaces)
   if(!this.state.journee) {
     var affichageCreneaux =     
     <formGroup>
     <Row style={{marginTop: marges+'px'}}>
     <Col xs={12} sm={3}>
      <b>Créneau</b>
     </Col>
     <Col xs={12} sm={2}>
      <b>Places disponibles</b>
     </Col>
     <Col xs={12} sm={2}>
      <b>Inscrits</b>
     </Col>
    </Row>
      <ListeCreneaux creneaux={this.state.creneaux} siRetraitCreneau={this.handleRetraitCreneau} siAjoutCreneau={this.handleAjoutCreneau}/>
    </formGroup>
   } else {
     var affichageCreneaux = null;
   }
    return (
      <form>
      <Row style={{marginBottom: marges+'px'}}>
      <Col xs={12} sm={8}>
       <FormGroup>
       <label for="title">Titre</label>
       <FormControl
            type="text"
            defaultValue={this.props.evenement.titre}
            placeholder="Titre de l'évènement"
          />
       </FormGroup>
       </Col>
       <Col xs={12} sm={4}>
       <FormGroup>
       <label for="type">Proposé par</label>
        <FormControl componentClass="select" placeholder="select" defaultValue={this.props.evenement.par}>
        <option value="La Bonne Fabrique">La Bonne Fabrique</option>
        <option value="Le Coworking">L'espace coworking</option>
        <option value="La micro brasserie">La micro brasserie</option>
        <option value="La Salle des Machines">La Salle des Machines</option>
        <option value="Autres">Autres</option>
      </FormControl>
       </FormGroup>
       </Col>
      </Row>
      
       <Row style={{marginTop: marges+'px'}}>
        <Col xs={12} sm={3}>
          <b>Lieu</b>
        </Col>
        <Col xs={12} sm={2}>
          <b>Places</b>
        </Col>
        <Col xs={12} sm={2}>
          <b>Jours</b>
        </Col>
      </Row>
      
      <Row style={{marginBottom: marges+'px'}}>
        <Col xs={12} sm={3}>
        <FormControl
            type="text"
            defaultValue={this.props.evenement.lieu}
            placeholder="Lieu où se tient l'évènement"
          />
        </Col>
        <Col xs={12} sm={2}>
        <FormControl
            type="text"
            defaultValue={this.state.totalPlaces}
            placeholder="Nombre de places disponibles"
            disabled={!this.state.journee}
          />
        </Col>
        
    <Col xs={12} sm={2}>
        <FormControl
            type="text"
            defaultValue={this.props.evenement.jours}
            placeholder="Si sur plusieurs jours"
            disabled={!this.state.journee}
          />
        </Col>
    <Col xs={12} sm={3}>
      <Checkbox 
        id="journee" 
        onChange={this.checkBoxChanged}>
          <b>Journée(s) entière(s)</b>
      </Checkbox>
      </Col>
    <Col xs={12} sm={2}>
      <Checkbox 
        id="besoinInscription" 
        >
          <b>Inscription ?</b>
      </Checkbox> 
    </Col>
      </Row>
      
      {affichageCreneaux}
    <Row>  
      <FormGroup controlId="formControlsTextarea">
      <Col xs={12} sm={6}>
      <ControlLabel>Description</ControlLabel>
      <FormControl componentClass="textarea" placeholder="Description..." />
      </Col>
    </FormGroup>
</Row>
      </form>

    );
  }
})