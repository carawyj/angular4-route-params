import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }                 from '@angular/common';

import { DataService } from '../data.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  person;

  constructor(private _dataService: DataService,
    private route: ActivatedRoute,
    private location: Location,
    private router : Router) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this._dataService.getUserById(params['id']))
      .subscribe(person => {
        this.person = person;
        //console.log(this.event);
      });
      //console.log(this.event);
  }

}
