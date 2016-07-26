import { Component }   from '@angular/core';
import { Parties }     from '../../../collections/parties';
import { PartiesForm } from '../parties-form/parties-form';
import { Mongo }       from 'meteor/mongo';
import { ROUTER_DIRECTIVES }  from '@angular/router';
import { LoginButtons } from 'angular2-meteor-accounts-ui';
import { MeteorComponent } from 'angular2-meteor';
import { PaginationService, PaginatePipe, PaginationControlsCmp } from 'angular2-pagination';
import template from './parties-list.html';

@Component({
  selector: 'parties-list',
  template,
  viewProviders: [PaginationService],
  directives: [PartiesForm, ROUTER_DIRECTIVES, LoginButtons, PaginationControlsCmp],
  pipes: [PaginatePipe]
})
export class PartiesList extends MeteorComponent {
  parties: Mongo.Cursor<Party>;
  pageSize: number = 10;
  curPage: ReactiveVar<number> = new ReactiveVar<number>(1);
  nameOrder: number = 1;

  constructor() {
    super();

    this.autorun(() => {
      let options = {
        limit: this.pageSize,
        skip: (this.curPage.get() - 1) * this.pageSize,
        sort: { name: this.nameOrder }
      };

      this.subscribe('parties', options, () => {
        this.parties = Parties.find({}, { sort: { name: this.nameOrder } });
        // this.parties = Parties.find();
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



  onPageChanged(page: number) {
    this.curPage.set(page);
  }
}
