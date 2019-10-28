import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Friend} from '../../models/friend';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  // TODO: manage state of all subcomponents & modules within this component
  public friends: Friend[];
  public friendRequests: Friend[];

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getFriends().subscribe((friends) => this.friends = friends);
    this.api.getFriendRequests().subscribe((requests) => this.friendRequests = requests);
  }
}
