import {loadParties} from './load-parties';
import {Meteor} from 'meteor/meteor';
import './parties.ts';

Meteor.startup(loadParties);
