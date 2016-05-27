import faker from 'faker';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

export const Evenements = new Meteor.Collection( 'evenements' );

evenements.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

evenements.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Evenements.schema = new SimpleSchema({
  "title": {
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
    label: "Evénement à la journée"
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
    label: "Le nombre de places de l'activité"
  },
  "lieu": {
    type: String,
    label: "Lieu où se déroule l'évènement"
  },
  "description": {
    type: String,
    label: "Description de l'évènement"
  },
  "creneau": {
    type: [Object],
    label: "Horaire, nombre de places et d'inscrits"
  },
  "creneau.$.horaire": {
    type: String,
    label: "Le créneau horaire"
  },
  "creneau.$.places": {
    type: Number,
    label: "Le nombre de places dans le créneau"
  }
  ,
  "creneau.$.inscrits": {
    type: Number,
    label: "Le nombre d'inscrits dans le créneau (calculé)"
  }
});

evenements.attachSchema( Evenements.schema );