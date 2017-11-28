import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  users: Array<any>;

  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this._dataService.getUsers()
        .subscribe(res => this.users = res);
  }

}
