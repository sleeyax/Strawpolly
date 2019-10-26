import {Component, Input, OnInit} from '@angular/core';
import {Friend} from '../../../models/friend';

@Component({
  selector: 'friend-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})
export class FriendsListComponent implements OnInit {
  @Input()
  // List of friends
  public friends: Friend[];

  @Input()
  // A friend list can be either a list of incoming FRs or a list of outgoing FRs
  public isIncoming: boolean;

  constructor() { }

  ngOnInit() {
  }
}
