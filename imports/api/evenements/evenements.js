import faker from 'faker';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

export const Evenements = new Meteor.Collection( 'evenements' );

Evenements.schema = new SimpleSchema({
  "titre": {
    type: String,
    label: "Le titre de l'activité"
  },
  "start": {
    type: Date,
    label: "Date à laquelle l'activité est prévue"
  },
  "end": {
    type: Date,
    label: "Date à laquelle l'activité se termine"
  },
  "allDay": {
    type: Boolean,
    label: "Evénement à la journée",
  },
  "nbJours": {
    type: Number,
    label: "le nombre de jours de l'activité si en jours entiers"
  },
  "type": {
    type: String,
    label: "Quelle structure propose l'activité ?",
    allowedValues: ['La-Bonne-Fabrique', 'Le-Coworking', 'La-micro-brasserie','La-Salle-des-Machines','Autres']
    },
  "places": {
    type: Number,
    label: "Le nombre de places de l'activité",
    optional: true
  },
  "lieu": {
    type: String,
    label: "Lieu où se déroule l'évènement"
  },
  "description": {
    type: String,
    label: "Description de l'évènement",
  },
  "creneaux": {
    type: [Object],
    label: "Horaire, nombre de places et d'inscrits"
  },
  "creneaux.$.horaire": {
    type: String,
    label: "Le créneau horaire"
  },
  "creneaux.$.places": {
    type: Number,
    label: "Le nombre de places dans le créneau"
  }
  ,
  "creneaux.$.inscrits": {
    type: Number,
    label: "Le nombre d'inscrits dans le créneau (calculé)"
  }
});

Evenements.attachSchema( Evenements.schema );