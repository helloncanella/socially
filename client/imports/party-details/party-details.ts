import { Component } from '@angular/core';
import { ActivatedRoute, ROUTER_DIRECTIVES } from '@angular/router';
import {Parties} from '../../../collections/parties.ts';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import template from './party-details.html';
import { MeteorComponent } from 'angular2-meteor';

@Component({
  selector: 'party-details',
  template,
  directives: [ROUTER_DIRECTIVES]
})

export class PartyDetails extends MeteorComponent {
  partyId: string;
  party: Party;

  constructor(private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.partyId = params['partyId'];
      this.subscribe('party', this.partyId, () => {
        this.party = Parties.findOne(this.partyId);
      }, true);
    });
  }

  saveParty(party) {
    if (Meteor.userId()) {
      Parties.update(party._id, {
        $set: {
          name: party.name,
          description: party.description,
          location: party.location
        }
      });
    } else {
      alert('Please log in to change this party');
    }
  }
}
