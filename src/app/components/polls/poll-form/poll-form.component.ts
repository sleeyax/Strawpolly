import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, Validators} from '@angular/forms';
import {Answer, Poll} from '../../../models/poll';
import {ApiService} from '../../../services/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Friend} from '../../../models/friend';

@Component({
  selector: 'app-poll-form',
  templateUrl: './poll-form.component.html',
  styleUrls: ['./poll-form.component.scss']
})
export class PollFormComponent implements OnInit {
  public formSubmitted: boolean = false;
  public pollForm = this.fb.group({
    title: ['', [Validators.required]],
    fields: this.fb.array([this.createField()]),
    invitedFriends: ['', Validators.required]
  });
  // whether or not the form is used to edit a poll instead of creating one
  public isEdit: boolean = false;
  private pollId: number = null;

  public friends: Friend[];

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number.parseInt(params.get('id'));
      if (!isNaN(id) && id != null) {
        this.pollId = id;
        this.isEdit = true;
        this.populateFields(id);
      }
    });
    this.api.getVerifiedFriends().subscribe(
      friends => this.friends = friends.map(f => this.appendFullName(f)),
      err => console.error(err)
    );
  }

  onFormSubmit() {
    // TODO: check if form is valid
    const answers = this.pollForm.controls.fields.value
      .filter((field) => field != "")
      .map((field) => new Answer(field));

    const poll = new Poll(this.pollId, this.pollForm.value.title, answers, this.pollForm.value.invitedFriends);

    const apiMethod = (poll) => this.isEdit ? this.api.editPoll(poll) : this.api.createPoll(poll);

    // TODO: catch errors
    apiMethod(poll).subscribe(
      (response) => {
        console.log(response);
        this.router.navigateByUrl('/');
      },
      (err) => console.error(err)
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
  private createField() {
    return this.fb.control('');
  }

  /**
   * Fires whenever a field has focus
   * @param index
   */
  public onFieldFocused(index: number) {
    const fieldsCount = this.fields.length;
    if (fieldsCount - 1 == index)
      this.fields.push(this.createField());
  }

  /**
   * Returns all dynamically added form 'option' fields
   */
  public get fields() {
    return this.pollForm.get('fields') as FormArray;
  }

  /**
   * Populate fields with data from specified poll
   * @param pollId
   */
  private populateFields(pollId: number) {
    this.api.getPoll(pollId).subscribe(poll => {
      this.pollForm.controls.title.setValue(poll.name);
      this.pollForm.controls.fields = this.fb.array(poll.answers.map(answer => [answer.answer,  Validators.required]))
      // this.pollForm.controls.invitedFriends = this.fb.array(poll.participants.map(participant => [participant, Validators.required]));
      // TODO: update invited friends
      console.log(this.pollForm.controls.invitedFriends);
    }, err => console.log(err));
  }
}
