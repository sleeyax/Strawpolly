import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Poll} from '../../../models/poll';
import {ApiService} from '../../../services/api.service';
import {Router} from '@angular/router';
import {Friend} from '../../../models/friend';
import PollAnswer from '../../../models/poll-answer';
import {PollParticipant} from '../../../models/poll-participant';
import {AlertService} from '../../../services/alert.service';

@Component({
  selector: 'poll-form',
  templateUrl: './poll-form.component.html',
  styleUrls: ['./poll-form.component.scss']
})
export class PollFormComponent implements OnInit {
  public formSubmitted: boolean = false;
  public pollForm: FormGroup;
  // pollId of poll to edit (optional)
  @Input()
  public pollId: number;
  // list of friends that can be invited to this poll
  public friends: Friend[];

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private alert: AlertService
  ) {
    this.pollForm = this.fb.group({
      title: ['', [Validators.required]],
      optionFields: this.fb.array([this.createOptionfield()]),
      invitedFriends: [[], [Validators.required]]
    });
  }

  ngOnInit() {
    this.api.getVerifiedFriends().subscribe(
      friends => {
        this.friends = friends.map(f => this.appendFullName(f));
        if (this.pollId != null)
          this.fetchPoll(this.pollId, (poll) => this.populateFields(poll));
      },
      err => console.error(err)
    );
  }

  /**
   * Get poll by specified id and pass the result to specified callback
   * @param pollId
   * @param cb
   */
  private fetchPoll(pollId: number, cb: Function) {
    this.api.getPoll(pollId).subscribe(
      poll => cb(poll),
      err => console.error(err)
    );
  }

  onFormSubmit() {
    const answers = this.pollForm.controls.optionFields.value
      .filter((field) => field != "");

    const poll = new Poll(
      this.pollId != null ? this.pollId : null,
      this.pollForm.value.title,
      answers.map(a => new PollAnswer(null, a)),
      this.pollForm.value.invitedFriends.map(friendId => new PollParticipant(friendId))
    );
   /* console.log(this.pollForm);
    console.log(poll);*/

    const apiMethod = (poll) => this.pollId != null ? this.api.editPoll(poll) : this.api.createPoll(poll);

    apiMethod(poll).subscribe(
      (response) => {
        console.log(response);
        this.router.navigateByUrl('/dashboard');
      },
      (err) => this.alert.showError(err)
    );
  }

  /**
   * Add full name property to the friend object
   * NOTE: according to the docs of ng-select, you should be able to use a ng-template
   *       but that doesn't work here for some reason ¯\_(ツ)_/¯
   * @param friend
   */
  private appendFullName(friend: Friend) {
    friend.friend['fullName'] = friend.friend.firstName + ' ' + friend.friend.lastName;
    return friend;
  }

  /**
   * Creates an empty 'option' field
   */
  private createOptionfield() {
    return this.fb.control('');
  }

  /**
   * Fires whenever a field has focus
   * @param index
   */
  public onOptionFieldFocused(index: number) {
    const fieldsCount = this.optionFields.length;
    if (fieldsCount - 1 == index)
      this.optionFields.push(this.createOptionfield());
  }

  /**
   * Returns all dynamically added form 'option' optionFields
   */
  public get optionFields() {
    return this.pollForm.get('optionFields') as FormArray;
  }

  /**
   * Populate optionFields with data from specified poll
   * @param poll
   */
  private populateFields(poll: Poll) {
    this.pollForm.controls.title.setValue(poll.name);
    this.pollForm.controls.optionFields = this.fb.array(poll.answers.map(answer => [answer.answer,  Validators.required]));
    // add option field just in case
    this.optionFields.push(this.createOptionfield());
    this.pollForm.controls.invitedFriends.patchValue(poll.participants.map(p => p.participant.memberID));
  }
}
