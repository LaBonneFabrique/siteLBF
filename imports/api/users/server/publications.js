import { Meteor } from 'meteor/meteor';

Meteor.publish('utilisateurs', function () {
  return Meteor.users.find({}, {fields: {'profile': 1, 'services': 1, 'emails': 1, 'reglageService': 1}});
});