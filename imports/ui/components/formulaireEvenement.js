import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';
import {Random} from 'meteor/random';
//import {FormGroup, ControlLabel, FormControl, Button, ButtonToolbar} from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import {insertEvenement, updateEvenement, removeEvenement} from '../../api/evenements/methods.js';
import { getInputValue } from '../../modules/get-input-value';
import CreateDropzone from '../containers/dropzone.js';
import ListeImagesEvenement from '../containers/listeImagesEvenement';

//bascule vers Material-ui
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import FontIcon from 'material-ui/FontIcon';
//inlinegrid
import { Grid, Row, Cell } from 'react-inline-grid';
//import couleur LBF
var couleurs = require('../themeLBF/couleurs');

var FontAwesome = require('react-fontawesome');
var moment = require('moment');
moment.locale('fr');

const optionsGrid = {
  columns: 12,
  gutter: 20,
  margin: 0
};

const styles = {
  floatingLabel: {
    margin: '0px',
    padding: '0px',
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
  },
  noMargin: {
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: 'black',
    padding: '0px',
    margin: '0px'
  },
  blanc: {
    color: 'white',
    width: '100%', 
    margin: '5px'
  }
};

var ListeCreneaux = React.createClass(
  {
    handleClickMoins: function (i) {
      this.props.siRetraitCreneau(i);
    },
    handleClickPlus: function () {
      this.props.siAjoutCreneau();
    },
    handleChangeCreneau: function () {
      var lesNouveauxCreneaux=[];
      var totalPlaces=0;
      const self=this;
      this.props.creneaux.map(function(creneau, index) {
        const refId = creneau._id;
        const refHoraire = 'horaire'+index;
        const refPlaces = 'places'+index;
        const horaires=self.refs[refHoraire].getValue();
        const places = Number(self.refs[refPlaces].getValue());
        totalPlaces += places;
        const inscrits = creneau.inscrits;
        lesNouveauxCreneaux.push({_id: refId, horaire: horaires, places: places, inscrits: inscrits });
      });
      this.props.siChangeCreneau(lesNouveauxCreneaux, totalPlaces);
    },
    render: function()  {

    var self = this;
    var liste = this.props.creneaux.map(function(creneau, index) {
    const refHoraire = 'horaire'+index;
    const refPlaces = 'places'+index;
    if(index>=1) {
       var bouton = <Cell is="1 phone-12">
          <FlatButton onClick={() => self.handleClickMoins(index)}><FontAwesome name='minus' /></FlatButton>
        </Cell>;
     } else {
       var bouton = <Cell is="1 phone-12">
          <FlatButton onClick={() => self.handleClickPlus()}><FontAwesome name='plus' /></FlatButton>
        </Cell>;
     }
      return (
      <Row key={index} is="nospace">
      <Cell is="3 phone-12">
          <TextField
            style={styles.centPourCent}
            type='text'
            name='creneauHoraire'
            defaultValue={creneau.horaire} 
            key = 'horaire-{index}'
            ref = {refHoraire}
            onBlur = {self.handleChangeCreneau}
            />
      </Cell>
        <Cell is="2 phone-12">
          <TextField
            style={styles.centPourCent}
            type='text' 
            defaultValue={creneau.places} 
            key = 'places-{index}'
            ref= {refPlaces}
            name={refPlaces}
            onChange = {self.handleChangeCreneau}
            />
      </Cell>
        <Cell is="2 phone-12">
          <TextField
            style={styles.centPourCent}
            type='text'
            defaultValue={creneau.inscrits.length} 
            key = 'inscrits-{index}'
            ref='inscrits-{index}'
            name='inscrits-{index}'
            onChange = {self.changeCreneau}
            disabled
            />
      </Cell>
    
      {bouton}
      
      </Row>

        );
      
    });

    return (
      <div>
        {liste}
      </div>
      );
    }
  });
  
export const FormulaireEvenement = React.createClass({
getInitialState() {
  var journee =this.props.evenement.allDay;
  var nbTotalPlaces=0;
      if (typeof this.props.evenement.allDay != 'undefined'&&!this.props.evenement.allDay) {
        this.props.evenement.creneaux.map(function(creneau) {
          nbTotalPlaces+=creneau.places;
        }
          );
      }
      if (this.props.evenement.allDay) {
          nbTotalPlaces+=this.props.evenement.nbTotalPlaces;
      }
      if (typeof this.props.evenement.allDay == 'undefined') 
        journee = false;
      
     return {
     creneaux: this.props.evenement.creneaux,
     journee: journee,
     nbTotalPlaces: nbTotalPlaces,
     titreEve: this.props.evenement.titre,
     start:  this.props.evenement.start,
     jours: this.props.evenement.jours,
     inscription: this.props.evenement.inscription,
     par: this.props.evenement.par,
     choixImage:this.props.evenement.lienImage
    };
  },
  
componentDidMount() {
},
  
onClic: function () {
  this.handleAjoutEve(event);

},

handleAjoutEve: function(event) {
  
  const titre = this.refs.titreEve.getValue();
  const nbJours = Number(this.refs.nbJours.getValue());
  const type = this.state.par;
  const lieu = this.refs.lieu.getValue();
  const description = this.refs.descriptionEve.getValue();
  var nbTotalPlaces = 0;
  if (this.state.inscription&&this.state.journee)
    nbTotalPlaces = this.refs.nbTotalPlaces.getValue();
  if(!this.state.journee) {
        this.state.creneaux.map(function(creneau) {
          nbTotalPlaces+=creneau.places;
        }
          );
  }
  
  const allDay = this.state.journee;
  const inscription = this.state.inscription;
  const lienImage = this.state.choixImage;
  
  let start = moment().toDate();
  let end = moment().toDate();
  
  const creneaux = this.state.creneaux;
  nbTotalPlaces = Number(nbTotalPlaces);
  switch (this.props.operation) {
    case 'add':
      start = this.state.start.toDate();
      const duree = moment.duration({'days' : nbJours});
      end = allDay ? moment(this.state.start).add(duree).toDate() : start;

      
      let evenement = {titre, start, end, allDay, nbJours, nbTotalPlaces, type, lieu, description, creneaux, inscription, lienImage,
        };
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
      console.log(nbTotalPlaces)
      let evenementId = this.props.eveId;
        let update = {titre, start, end, allDay, nbJours, nbTotalPlaces, type, lieu, description, creneaux, inscription, lienImage, };
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
    var creneauId = Random.id();
    var nbCreneaux = listeCreneaux.push({_id: creneauId, horaire: "14h01-18h00",
                places: placeRandom,
                inscrits: []});
    var nbPlaces = this.calculPlaces(listeCreneaux);
    this.setState({creneaux:listeCreneaux, journee: this.state.journee, totalPlaces: nbPlaces});
  },
  
checkBoxChangedJournee: function() {
    var change=true;
    this.state.journee?change=false:change=true;
    setTimeout(() => this.setState({journee: change}));
    //this.setState({journee: change}, function(){});
  },
  
checkBoxChangedInscription: function() {
    var change=true;
    change = this.state.inscription?false:true;
     setTimeout(() =>this.setState({ inscription: change}));
  },
  
remove: function() {
  const _id = this.props.evenement._id;
  removeEvenement.call({_id}, (error) => {
          if (error) {
            Bert.alert(error.reason, 'danger');
          } else {
            Bert.alert('L\'événement a été effacé.', 'success');
              this.props.fermer();
            }
        });
},

handleChangeCreneau: function(lesCreneaux, nbPlaces) {
this.setState({creneaux: lesCreneaux}, function() {});
this.setState({nbTotalPlaces: nbPlaces});
$('[name="nbTotalPlaces"]').val(nbPlaces);
},

handleChangePar: function(event, index, value) {
this.setState({par: value});
},

retourChoix: function(id) {
  this.setState({choixImage: id});
},
  
render: function() {
    var metaImage = {structure: this.state.par, utilisation: 'accueil'};
    let affichageCreneaux;
   if(!this.state.journee) {
     affichageCreneaux =     
      <div>
      <Row is="nospace" className="spaceTop10">
      <Cell is="3 phone-12">
        <b>Créneau</b>
      </Cell>
      <Cell is="2 phone-2">
        <b>Places</b>
      </Cell>
      <Cell is="2 phone-12">
        <b>Inscrits</b>
      </Cell>
      </Row>
        <ListeCreneaux 
          creneaux={this.state.creneaux} 
          siRetraitCreneau={this.handleRetraitCreneau} 
          siAjoutCreneau={this.handleAjoutCreneau} 
          siChangeCreneau={this.handleChangeCreneau}
        />
        </div>;
   } else if (this.state.inscription) {
     affichageCreneaux = <Row is="start nospace"><Cell is="3 middle"><p><b>Nombre de places</b></p></Cell>
        <Cell is="2">
        <TextField
            style={styles.centPourCent}
            type="text"
            ref="nbTotalPlaces"
            name="nbTotalPlaces"
            defaultValue={this.state.nbTotalPlaces}
            floatingLabelStyle={styles.floatingLabel}
          /></Cell></Row>;
   } else affichageCreneaux = null;
   let boutonEnvoie;
    switch(this.props.operation) {
       case 'add':
         boutonEnvoie = 
              <Row is="nospace">
              <Cell is="3 offset-6">
                <FlatButton
                  label="Annuler"
                  labelPosition="after"
                  backgroundColor={couleurs.atelier}
                  hoverColor={couleurs.grisLBF}
                  style={styles.blanc}
                  onClick={this.props.fermer}
                  icon={
                    <FontIcon
                        className="fa fa-ban"
                      />}
                />
                </Cell>
              <Cell is="3">
               <FlatButton
                  label="Créer"
                  labelPosition="after"
                  backgroundColor={couleurs.jardin}
                  hoverColor={couleurs.grisLBF}
                  style={styles.blanc}
                  onClick={this.handleAjoutEve}
                  icon={
                    <FontIcon
                        className="fa fa-plus-square-o"
                      />}
                /></Cell>
              </Row>;
         break;
      case 'edit':
          boutonEnvoie = 
              <Row is="nospace">
              <Cell is="3 offset-3">
                    <FlatButton
                        label="Annuler"
                        labelPosition="after"
                        backgroundColor={couleurs.atelier}
                        hoverColor={couleurs.grisLBF}
                        style={styles.blanc}
                        onClick={this.props.fermer}
                        icon={
                          <FontIcon
                              className="fa fa-ban"
                            />}
                      />
              </Cell>
              <Cell is="3">
                <FlatButton
                  label="Effacer"
                  labelPosition="after"
                  backgroundColor={couleurs.brasserie}
                  hoverColor={couleurs.grisLBF}
                  style={styles.blanc}
                  onClick={this.remove}
                  icon={
                    <FontIcon
                        className="fa fa-trash-o"
                      />}
                />
              </Cell>
              <Cell is="3">
                  <FlatButton
                  label="Editer"
                  labelPosition="after"
                  backgroundColor={couleurs.jardin}
                  hoverColor={couleurs.grisLBF}
                  style={styles.blanc}
                  onClick={this.handleAjoutEve}
                  icon={
                    <FontIcon
                        className="fa fa-pencil-square-o"
                      />}
                />
              </Cell>
              </Row>;
        break;
     }

   
    return (

     <form className="noSpace">
      <Grid
        options={optionsGrid}
      >
      <div className="noSpace">
      <Row>
      <Cell is="7 phone-12">
       <TextField
            style={styles.centPourCent}
            type="text"
            ref="titreEve"
            name="titreEve"
            defaultValue={this.props.evenement.titre}
            placeholder="Titre de l'événement"
            floatingLabelText="Titre"
            floatingLabelStyle={styles.floatingLabel}
          />
      </Cell>
      <Cell is="5 phone-12">
        <SelectField 
          style={styles.centPourCent}
          value={this.state.par} 
          onChange={this.handleChangePar} 
          floatingLabelText="Proposé par"
          floatingLabelStyle={styles.floatingLabel}
          ref="structure">
          <MenuItem value={"La-Bonne-Fabrique"} primaryText="La Bonne Fabrique" />
          <MenuItem value={"Le-Coworking"} primaryText="L'espace coworking" />
          <MenuItem value={"La-brasserie"} primaryText="La brasserie" />
          <MenuItem value={"La-Salle-des-Machines"} primaryText="La Salle des Machines" />
          <MenuItem value={"Autres"} primaryText="Autres" />
        </SelectField>
        </Cell>
      </Row>
        <Row>
        <Cell is="7 phone-12">
       <TextField
          style={styles.centPourCent}
            type="text"
            ref="lieu"
            name="lieu"
            defaultValue={this.props.evenement.lieu}
            placeholder="Lieu où se tient l'événement"
            floatingLabelText="Lieu"
            floatingLabelStyle={styles.floatingLabel}
          />
        </Cell>
        <Cell is="4 phone-12 ">
          <Checkbox
          style={styles.marginTop15}
            label="sur inscription ?"
            labelPosition="right"
            id="besoinInscription" 
            onCheck={this.checkBoxChangedInscription}
            checked={this.state.inscription}
          />
        </Cell>
        </Row>
        <Row className="spaceTop10">
        <Cell is="5 phone-6">
          <Checkbox
            label="Journée(s) entière(s) ?"
            labelPosition="left"
            id="journee"
            onCheck={this.checkBoxChangedJournee}
            style={styles.marginTop10}
            checked = {this.state.journee}
          />
        </Cell>
        <Cell is="5 phone-12">
          <div>Si oui, précisez le nombre de jour(s)</div>
          </Cell>
          <Cell is="2 phone-12">
       <TextField
          style={styles.centPourCent}
            type="text"
            ref="nbJours"
            name="nbJours"
            defaultValue={this.props.evenement.jours}
            disabled={!this.state.journee}
          />
        </Cell>
      </Row>
      {affichageCreneaux}
      <Row>
            <Cell is="12">
        <TextField
          style={styles.centPourCent}
            type="text"
            ref="descriptionEve"
            name="descriptionEve"
            multiLine={true}
            rows={3}
            rowsMax={5}
            floatingLabelText="description"
            floatingLabelFixed={true}
            textareaStyle={styles.borderTextArea}
            defaultValue={this.props.evenement.description}
          />

      </Cell>
      </Row>
      <Row>
      <Cell is="4 phone-12" >
        <CreateDropzone meta={metaImage}/>
      </Cell>
      <Cell is="6 phone-12">
      <ListeImagesEvenement structure={this.state.par} retourChoix={this.retourChoix} choixImg={this.state.choixImage}/>
      </Cell>
      </Row>
      {boutonEnvoie}
      </div>
      </Grid>
      </form>

    );
  }
})