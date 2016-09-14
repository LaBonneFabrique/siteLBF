
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Users } from '../api/users/users.js';
import { Evenements } from '../api/evenements/evenements.js';
import { Email } from 'meteor/email'

export const envoiEmailConfirmation = new ValidatedMethod({
  name: 'inscriptions.mailConfirmation',
    validate: new SimpleSchema({
    userId: { type: String },
    eveId: {type:String},
  }).validator(),
  run({ userId, eveId }) {
    if (Meteor.isServer) {
  var recapCreneaux="";
  const userData = Users.findOne({_id: userId});
  const famille = userData.famille;
  const mail = userData.emails;
  console.log(mail[0].address)

  const evenement = Evenements.findOne({_id: eveId});
  const creneaux = evenement.creneaux;

  famille.map(function(membre) {

    creneaux.map(function(creneau) {
      if (creneau.inscrits.length>0) {
      const trouveMembre = function(inscrit) {
        return inscrit === membre._id;
        };
     const indexInscrit = creneau.inscrits.findIndex(trouveMembre);
      if (indexInscrit>=0) {
        recapCreneaux+="<p>"+membre.prenom+" est inscrit-e sur le creneau"+creneau.horaire+"</p>";
      }
      }
    });
  });
console.log("preparation terminée")
const leTexte = Assets.getText('emailRecapInscriptions.html');
console.log(leTexte)

const html = leTexte.replace("{{lesInscriptions}}",recapCreneaux);

Email.send({
  to: userData.emails[0].address,
  from: "lasalledesmachines@labonnefabrique.fr",
  subject: "Détails de vos inscriptions",
  html: html,
});

}

  },
});
