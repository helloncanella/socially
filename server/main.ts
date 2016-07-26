import {loadParties} from './load-parties';
import {Meteor} from 'meteor/meteor';
import './parties.ts';
import './users.ts';

Meteor.startup(loadParties);
