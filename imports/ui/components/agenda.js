import React from 'react';
import moment from 'moment';
import {Modal} from 'react-bootstrap';
import { FormulaireEvenement } from '../components/formulaireEvenement';
import {updateEvenement} from '../../api/evenements/methods.js';

import $ from 'jquery';
import fullCalendar from 'fullcalendar';
import 'fullcalendar/dist/lang/fr';
import { Bert } from 'meteor/themeteorchef:bert';

var aujourdhuiDate = moment();


let isPast = ( date ) => {
  let today = moment().format();
  return moment( today ).isAfter( date );
};


const Calendar = React.createClass({
      getInitialState() {
    return {
        eveId: '',
        showModal: false,
        render:false,
        operation: 'add',
        NEWEVE: {
      titre: 'bobo !',
      par: 'La Bonne Fabrique',
      lieu: 'La Bonne Fabrique',
      places: 8,
      jours: 1,
      date: aujourdhuiDate,
      creneaux: [{horaire: "14h00-18h00",
                places: 8,
                inscrits: 0}
                ]
    }
    };
  },

  close() {
    const { calendar } = this.refs;
    this.setState({ showModal: false });
    

  },

  open() {
    this.setState({ showModal: true });
  },
  componentDidMount() {
          
    const { calendar } = this.refs;
    const evenements = this.props.evenements;

    const self = this;
    $(calendar).fullCalendar({
      lang: 'fr',
      editable: true,
      eventDurationEditable: true,
      events( start, end, timezone, callback ) {
      let data = evenements.map( ( event ) => {
        event.editable = !isPast( event.start );
        console.log(event.end)
        return event;
      });

      if ( data ) {
        callback( data );
      }
    },
    eventRender( event, element ) {
      element.find( '.fc-content' ).html(
        `<h4>${ event.titre }</h4>`
      );
    },
    dayClick( date ) {
      self.setState({operation: 'add'})
        if (!isPast(date)) {
   const nouveau = {
      titre: 'bobo !',
      par: 'La Bonne Fabrique',
      lieu: 'La Bonne Fabrique',
      places: 8,
      jours: 1,
      start: date,
      end: date,
      description: 'une description de l\'événement',
      creneaux: [{horaire: "14h00-18h00",
                places: 8,
                inscrits: 0}
                ]
    };
     self.setState({NEWEVE: nouveau});
     self.open();
        }
    },
    eventClick( event ) {
      self.setState({operation: 'edit'})
      self.setState({eveId: event._id})
      let nouveau = {};
    self.props.evenements.forEach(function (evenement) {
        if (evenement._id==event._id) {
      nouveau = {
      titre: evenement.titre,
      par: evenement.type,
      lieu: evenement.lieu,
      places: 10,
      jours: 1,
      start: evenement.start,
      end: evenement.end,
      description: evenement.description,
      creneaux: evenement.creneaux
    };
        }
        })
    self.setState({NEWEVE: nouveau});
     self.open();
     },
    eventResize (event, delta, revert) {
     let evenementId = event._id;
      let update = {
      end: event.end.toDate(),
      };
      
      updateEvenement.call({evenementId, update}, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Durée modifiée avec succès.', 'success');
      }
      
    });
    },
    eventDrop( event, delta, revert ) {
      let evenementId = event._id;
      let start = event.start.toDate()
      let end = event.end ? event.end.toDate(): event.start.toDate() ;
      if ( !isPast( start ) ) {
       let update = {start, end};

        updateEvenement.call({evenementId, update}, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Modification de la date effectué avec succès.', 'success');
      }
        });
      
      } else {
        revert();
        Bert.alert( 'Désolé, vous ne pouvez déplacer un événement dans le passé !', 'danger' );
      }
    },
    
    
    });
    this.setState({render:true});
  },
  render() {
      if (this.state.render) {
          const { calendar } = this.refs;
         $(calendar).fullCalendar('removeEvents');
         $(calendar).fullCalendar('addEventSource', this.props.evenements);         
         $(calendar).fullCalendar('rerenderEvents' );
      }
      
    return(
        <div>
      <div ref="calendar"></div>
      
      <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.operation=='edit'?'Modifier l\'événement':'Créer un nouvel événement'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormulaireEvenement evenement={this.state.NEWEVE} fermer={this.close} operation={this.state.operation} eveId = {this.state.eveId}/>
          </Modal.Body>
        </Modal>
      
      </div>
      );
      
  }
})

export const Agenda = ({ evenements }) => (
 <Calendar evenements={ evenements } />
);

Agenda.propTypes = {
  evenements: React.PropTypes.array,
};


