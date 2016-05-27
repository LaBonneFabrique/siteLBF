import React from 'react';
import moment from 'moment';
import $ from 'jquery';
import fullCalendar from 'fullcalendar';
import 'fullcalendar/dist/lang/fr';
import { Jumbotron } from 'react-bootstrap';


export const Calendar = React.createClass({
  componentDidMount() {
    const { calendar } = this.refs;
    $(calendar).fullCalendar({
      lang: 'fr'
    });
  },
  render() {
    return(
      <div ref="calendar"></div>
      );
      
  }
})

export const Agenda = () => (
  <Jumbotron className="text-center">
    <h2>Agenda</h2>
    <p>Oh, calmos, ça arrive....</p>
    <Calendar />
    <p> bobo ;(</p>
  </Jumbotron>
);