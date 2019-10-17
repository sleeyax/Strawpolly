import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends.list.component.html',
  styleUrls: ['./friends.list.component.scss']
})
export class FriendsListComponent implements OnInit {
  @Input()
  public friends;

  @Input()
  // Whether or not the friends list is a list of unaccepted friend requests
  public isIncomingFriendRequestsList: boolean;

  constructor() { }

  ngOnInit() {
  }

}
