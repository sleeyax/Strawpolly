import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../services/api.service';
import {AlertService} from '../../../services/alert.service';
import {FriendAction, FriendsService} from '../../../services/states/friends.service';

@Component({
  selector: 'friend-request-field',
  templateUrl: './friend-request-field.component.html',
  styleUrls: ['./friend-request-field.component.scss']
})
export class FriendRequestFieldComponent implements OnInit {
  @Input()
  public title: string;

  @Input()
  public subtitle: string;

  @Input()
  public separator: string = ';';

  // List of emails of your friends
  public friendRequestForm: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiService, private alert: AlertService, private friendsService: FriendsService) {
    this.friendRequestForm = fb.group({
      'emails': ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  private sendFriendRequests(friendEmails: string[]) {
    this.api.addFriendsByEmail(friendEmails).subscribe(
      res => {
        this.alert.showSuccess('Friend request sent successfully!');
        this.friendsService.friendStateBehaviourSubject.next(FriendAction.inviteSent)
      },
      err => {
        console.error(err);
        this.alert.showUnexpectedError();
      }
    );
  }

  public onFormSubmit() {
    const emails = this.friendRequestForm.value.emails
      .split(this.separator)
      .filter(e => e != '');
    if (emails.length > 0)
      this.sendFriendRequests(emails);
  }

}
