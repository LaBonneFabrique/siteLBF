import { composeWithTracker } from 'react-komposer';
import { Evenements } from '../../api/evenements/evenements.js';
import { Grille } from '../components/grilleAccueil.js';
import { Loading } from '../components/loading.js';
import { Meteor } from 'meteor/meteor';
import { Users } from '../../api/users/users.js';

const composer = (params, onData) => {
  const subscription = Meteor.subscribe('evenements');
  const subscriptionUser = Meteor.subscribe('utilisateurs');
  const subscriptionImages = Meteor.subscribe('images');
 if (subscription.ready()&&subscriptionUser.ready&&subscriptionImages.ready) {
   const evenements = Evenements.find({}, { sort: { start: 1 } }).fetch();
    let IdUtilisateur = Meteor.userId();
  const loggedUser = Users.findOne({_id: IdUtilisateur},{});
    onData(null, { evenements, loggedUser });
  }
};

export default composeWithTracker(composer, Loading)(Grille);
