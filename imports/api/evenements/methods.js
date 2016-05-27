import { Evenements } from './evenements';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const insertEvenement = new ValidatedMethod({
  name: 'documents.insert',
  validate: new SimpleSchema({
    "title": {type: String},
  "start": {type: Date},
  "end": {type: Date},
  "allDay": {type: Boolean},
  "nbJours": {type: Number},
  "type": {type: String},
  "places": {type: Number},
  "lieu": {type: String},
  "description": {type: String},
  "creneau": {type: [Object]},
  "creneau.$.horaire": {type: String},
  "creneau.$.places": {type: Number},
  "creneau.$.inscrits": {type: Number}
  }).validator(),
  run(evenement) {
    Evenements.insert(evenement);
  },
});