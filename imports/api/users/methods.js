import { Users } from './users';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const updateProfile = new ValidatedMethod({
  name: 'user.updateProfile',
  validate: new SimpleSchema ({
    usereId: {
      type: String
    },
    update: {
      type: Object
    },
    'update.profile': {
      type:Object
    },
    'update.profile.nom': {
      type: String
    },
    'update.profile.prenom': {
      type: String
    },
    'update.emails': {
       type: Array,
    },
    "update.emails.$": {
      type: Object
    },
    "update.emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "update.emails.$.verified": {
      type: Boolean
    }
  }).validator(),
  run({ usereId, update }) {
  Users.update(usereId, { $set: update });
  },
});

export const updateReglageService = new ValidatedMethod({
  name: 'user.updateReglageProfile',
  validate: new SimpleSchema({
    userId: {
      type: String
    },
    'update.reglageService': {
      type: Boolean
    }
  }).validator(),
  run({userId, update}) {
    Users.update(userId, {$set: update})
  }
})

/*
export const removeDocument = new ValidatedMethod({
  name: 'documents.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    Documents.remove(_id);
  },
});
*/