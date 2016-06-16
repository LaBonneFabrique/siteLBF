import React from 'react';
import ReactDom from 'react-dom';
import {FormGroup, ControlLabel, FormControl, Col, Row, Checkbox, Button} from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import {insertEvenement, updateEvenement} from '../../api/evenements/methods.js';

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
     totalPlaces: 8,
     titreEve: this.props.evenement.titre,
     start:  this.props.evenement.start,
     jours: this.props.evenement.jours
    };
  },
  
onClic: function () {
  this.handleAjoutEve(event);

},

handleAjoutEve: function(event) {
  
  const titre = ReactDom.findDOMNode(this.refs.titreEve).value;
  const nbJours = Number(ReactDom.findDOMNode(this.refs.nbJours).value);
  const type = ReactDom.findDOMNode(this.refs.structure).value;
  const lieu = ReactDom.findDOMNode(this.refs.lieu).value;
  const description = ReactDom.findDOMNode(this.refs.descriptionEve).value;
  const allDay = this.state.journee;
  
  let start = moment().toDate()
  let end = moment().toDate();
  
    const creneaux = this.state.creneaux;

  switch (this.props.operation) {
    case 'add':
      start = this.state.start.toDate();
      const duree = moment.duration({'days' : nbJours});
      end = allDay ? moment(this.state.start).add(duree).toDate() : start;
      let evenement = {titre, start, end, allDay, nbJours, type, lieu, description, creneaux,
        };
      console.log(evenement)
      insertEvenement.call(evenement, (error) => {
          if (error) {
            Bert.alert(error.reason, 'danger');
          } else {
            Bert.alert('Evénement créé avec succès.', 'success');
              this.props.fermer();
            }
        });
      break;
    case 'edit':
      start = this.props.evenement.start;
      end = this.props.evenement.end;
      
      let evenementId = this.props.eveId;
        let update = {titre, start, end, allDay, nbJours, type, lieu, description, creneaux, };
      updateEvenement.call({evenementId, update}, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Evénement modifié avec succès.', 'success');
          this.props.fermer();
      }
    });
    
      break;
    default:
      break;
  }
},

handleChangeForm: function(e, nomState) {
  switch (nomState) {
    case "titreEve": 
    this.setState({ titreEve: e.target.value });
    break;
    default:
      break;
  }

},
  
calculPlaces: function(listeCreneaux) {
    var nbPlaces = 0
    listeCreneaux.forEach(function(creneau) {
      nbPlaces=nbPlaces+creneau.places;
    })

    return nbPlaces;
  },

handleRetraitCreneau: function(i) {
  var listeCreneaux =this.state.creneaux;
  var creneauRetire = listeCreneaux.splice(i,1);
  var nbPlaces = this.calculPlaces(listeCreneaux)
  this.setState({creneaux:listeCreneaux, journee: this.state.journee, totalPlaces: nbPlaces});
  },
  
handleAjoutCreneau: function() {
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
      <form >
      <Row style={{marginBottom: marges+'px'}}>
      <Col xs={12} sm={8}>
       <FormGroup>
       <label for="title">Titre</label>
       <FormControl
            type="text"
            ref="titreEve"
            defaultValue={this.props.evenement.titre}
            placeholder="Titre de l'évènement"
          />
       </FormGroup>
       </Col>
       <Col xs={12} sm={4}>
       <FormGroup>
       <label for="type">Proposé par</label>
        <FormControl componentClass="select" placeholder="select" defaultValue={this.props.evenement.par} ref="structure">
        <option value="La-Bonne-Fabrique">La Bonne Fabrique</option>
        <option value="Le-Coworking">L'espace coworking</option>
        <option value="La-micro-brasserie">La brasserie</option>
        <option value="La-Salle-des-Machines">La Salle des Machines</option>
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
            ref="lieu"
          />
        </Col>
        <Col xs={12} sm={2}>
        <FormControl
            type="text"
            defaultValue={this.state.totalPlaces}
            placeholder="Nombre de places disponibles"
            disabled={!this.state.journee}
            ref="nbPlacesTotal"
          />
        </Col>
        
    <Col xs={12} sm={2}>
        <FormControl
            type="text"
            defaultValue={this.props.evenement.jours}
            placeholder="Si sur plusieurs jours"
            disabled={!this.state.journee}
            ref="nbJours"
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
    <Row style={{marginBottom: marges+'px'}}>  
      <FormGroup controlId="formControlsTextarea">
      <Col xs={12} sm={6}>
      <ControlLabel>Description</ControlLabel>
      <FormControl componentClass="textarea" placeholder="Description..."  ref="descriptionEve" defaultValue={this.props.evenement.description}/>
      </Col>
    </FormGroup>
</Row>
<Row style ={{textAlign: 'right'}}>
    <Button bsStyle="warning" style={{marginRight: marges+'px'}} onClick={this.props.fermer}>Annuler</Button>

    <Button bsStyle="success" onClick={this.onClic}>{this.props.operation=='edit'?'Modifier':'Créer'}</Button>

</Row>
      </form>

    );
  }
})