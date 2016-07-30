import { Component }   from '@angular/core';
import { Parties }     from '../../../collections/parties';
import { PartiesForm } from '../parties-form/parties-form';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { ROUTER_DIRECTIVES }  from '@angular/router';
import { LoginButtons, InjectUser } from 'angular2-meteor-accounts-ui';
import { MeteorComponent } from 'angular2-meteor';
import { PaginationService, PaginatePipe, PaginationControlsCmp } from 'angular2-pagination';
import template from './parties-list.html';
import { RsvpPipe } from '../pipes/pipes.ts';

@Component({
  selector: 'parties-list',
  template,
  viewProviders: [PaginationService],
  directives: [PartiesForm, ROUTER_DIRECTIVES, LoginButtons, PaginationControlsCmp],
  pipes: [PaginatePipe, RsvpPipe]
})

@InjectUser()
export class PartiesList extends MeteorComponent {
  parties: Mongo.Cursor<Party>;
  pageSize: number = 10;
  nameOrder: number = 1;
  user: Meteor.User;

  constructor() {
    super();

    this.autorun(() => {
      let options = {
        limit: this.pageSize,
        sort: { name: this.nameOrder }
      };

      this.subscribe('parties', options, () => {
        this.parties = Parties.find({}, { sort: { name: this.nameOrder } });
        }, true);
    });
  }

  removeParty(party) {
    Parties.remove(party._id);
  }


  search(value: string) {
    if (value) {
      this.parties = Parties.find({ location: value });
    } else {
      this.parties = Parties.find();
    }
  }

   
  isOwner(party: Party): boolean {
    if (this.user) {
      return this.user._id === party.owner;
    }
 
    return false;
  }


}
