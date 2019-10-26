import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../services/api.service';

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

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.friendRequestForm = fb.group({
      'emails': ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  private sendFriendRequests(friendEmails: string[]) {
    this.api.addFriendsByEmail(friendEmails).subscribe(
      res => console.log(res),
      err => console.log(err)
    );
  }

  public onFormSubmit() {
    const emails = this.friendRequestForm.value.emails.split(this.separator);
    // TODO: validate every email (regex pattern or using npm package perhaps?)
    this.sendFriendRequests(emails);
  }

}
