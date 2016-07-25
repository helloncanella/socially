import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';

export let Parties = new Mongo.Collection<Party>('parties');

Parties.allow({
  insert: function() {
    return verifyUser()
  },
  update: function() {
    return verifyUser()
  },
  remove: function() {
    return verifyUser()
  }
});

function verifyUser(){
  let user = Meteor.user();
  return !!user;
}
