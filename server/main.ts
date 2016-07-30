import {loadParties} from './load-parties';
import {Meteor} from 'meteor/meteor';
import './parties.ts';
import './users.ts';
import '../collections/methods.ts';

Meteor.startup(loadParties);
