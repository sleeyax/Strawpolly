import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Friend} from '../../models/friend';
import {FriendAction, FriendsService} from '../../services/states/friends.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  public friends: Friend[];
  public friendRequests: Friend[];

  constructor(private api: ApiService, private friendsService: FriendsService) {
    this.friendsService.friendStateBehaviourSubject.subscribe((action) => {
      if (action == FriendAction.inviteSent || action == FriendAction.friendRequestHandled) {
        this.getFriends();
      }
    });
  }

  ngOnInit() {
    this.getFriends();
    this.getFriendRequests();
  }

  private getFriends() {
    this.api.getFriends().subscribe((friends) => this.friends = friends);
  }

  private getFriendRequests() {
    this.api.getFriendRequests().subscribe((requests) => this.friendRequests = requests);
  }
}
