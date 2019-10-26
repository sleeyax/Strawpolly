import {Component, Input, OnInit} from '@angular/core';
import FriendStatus from '../../../models/friend-status';
import {Friend} from '../../../models/friend';
import {ApiService} from '../../../services/api.service';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'friends-action-button',
  templateUrl: './friends-action-button.component.html',
  styleUrls: ['./friends-action-button.component.scss']
})
// Dropdown Button Component that shows the appropriate actions for a specific friends relationship
export class FriendsActionButtonComponent implements OnInit {
  @Input()
  public friend: Friend;

  @Input()
  // If the FR is incoming (other user sent it to us), then the button should show different actions
  public isIncoming: boolean;

  // Button color
  public color: string;

  // Button text
  public text: string;

  // Button dropdown actions
  public actions: Object;

  private friendStatusBHS: BehaviorSubject<FriendStatus>;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.friendStatusBHS = new BehaviorSubject(this.friend.friendStatus);
    this.friendStatusBHS.subscribe(friendStatus => this.buildButton(friendStatus));
  }

  private buildButton(friendStatus: FriendStatus) {
    switch(friendStatus) {
      case FriendStatus.Pending:
        this.color = 'primary';
        if (this.isIncoming === true) {
          this.text = 'Pending';
          this.actions = {
            'Accept': this.accept,
            'Decline': this.decline
          };
        }else {
          this.text = 'Request Sent';
          this.actions = {
            'Cancel': this.remove
          };
        }
        break;
      case FriendStatus.Accepted:
        this.color = 'success';
        this.text = 'Accepted';
        this.actions = {
          'Block': this.block,
          'Remove': this.remove
        };
        break;
      case FriendStatus.Blocked:
        this.color = 'danger';
        this.text = 'Blocked';
        this.actions = {
          'Remove': this.remove,
        };
        break;
      case FriendStatus.Declined:
        this.color = 'warning';
        this.text = 'Declined';
        this.actions = {
          'Accept': this.accept,
          'Remove': this.remove
        };
        break;
      case FriendStatus.Removed:
        this.color = 'secondary';
        this.text = 'Removed';
        this.actions = {
          'Resend friend request': () => this.add([this.friend.friend.email])
        };
        break;
      default:
        throw `Unknown FriendStatus (${friendStatus})`;
    }
  }

  // Accept FR
  private accept() {
    console.log("Accepting FR - friendID: " + this.friend.friendID);
    this.changeFriendStatus(FriendStatus.Accepted);
  }

  // Decline FR
  private decline() {
    console.log("Declining FR - friendID: " + this.friend.friendID);
    this.changeFriendStatus(FriendStatus.Declined);
  }

  // Block friend
  private block() {
    console.log("Blocking FR - friendID: " + this.friend.friendID);
    this.changeFriendStatus(FriendStatus.Blocked);
  }

  // Remove friend
  private remove() {
    console.log("Removing friend - friendID: " + this.friend.friendID);
    this.friendStatusBHS.next(FriendStatus.Removed);
    this.api.deleteFriend(this.friend.friendID).subscribe(res => console.log(res), err => console.log(err));
  }

  // Add friend(s) (send friend request(s))
  private add(friendEmails: string[]) {
    this.api.addFriendsByEmail(friendEmails).subscribe(res => console.log(res), err => console.log(err));
    this.friendStatusBHS.next(FriendStatus.Pending);
  }

  public executeAction(actionName: string) {
    let action = this.actions[actionName].bind(this);
    action();
  }

  public getKeys = (obj: Object) => Object.keys(obj);

  private changeFriendStatus(newFriendStatus: FriendStatus) {
    this.friendStatusBHS.next(this.friend.friendStatus = newFriendStatus);
    this.api.editFriend(this.friend).subscribe(res => console.log(res), err => console.log(err));
  }
}
