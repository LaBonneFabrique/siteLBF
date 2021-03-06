import { composeWithTracker } from 'react-komposer';
import { Evenements } from '../../api/evenements/evenements.js';
import { Agenda } from '../components/agenda.js';
import { Loading } from '../components/loading.js';
import { Meteor } from 'meteor/meteor';

const composer = (params, onData) => {
  const subscription = Meteor.subscribe('evenements');
 if (subscription.ready()) {
   const evenements = Evenements.find().fetch();
   onData(null, { evenements });
  }

};

export default composeWithTracker(composer, Loading)(Agenda);