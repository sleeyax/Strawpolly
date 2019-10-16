import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, Validators} from '@angular/forms';
import {Answer, Poll} from '../../models/poll';
import {ApiService} from '../../services/api.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-poll.form',
  templateUrl: './poll.form.component.html',
  styleUrls: ['./poll.form.component.scss']
})
export class PollFormComponent implements OnInit {
  public formSubmitted: boolean = false;
  public pollForm = this.fb.group({
    title: ['', [Validators.required]],
    fields: this.fb.array([this.createField()])
  });
  // whether or not the form is used to edit a poll instead of creating one
  public isEdit: boolean = false;

  private pollId: number = null;

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
  }

  onFormSubmit() {
    // TODO: check if form is valid

    console.log(this.pollForm.value);

    const answers = this.pollForm.value.fields
      .filter((field) => field != "")
      .map((field) => new Answer(field));

    const poll = new Poll(this.pollId, this.pollForm.value.title, answers);
    console.log(poll);

    const apiMethod = (poll) => this.isEdit ? this.api.editPoll(poll) : this.api.createPoll(poll);

    // TODO: catch errors and re-route to dashboard if success
    apiMethod(poll).subscribe(
      (response) => {
        console.log(response);
        this.router.navigateByUrl('/');
      },
      (err) => console.error(err)
    );
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
      console.log(poll);
      this.pollForm = this.fb.group({
        title: [poll.name, Validators.required],
        fields: this.fb.array(poll.answers.map(answer => [answer.answer,  Validators.required]))
      });
    }, err => console.log(err));
  }
}
