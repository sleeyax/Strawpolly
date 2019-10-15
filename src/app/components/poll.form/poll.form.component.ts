import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, Validators} from '@angular/forms';
import {Answer, Poll} from '../../models/poll';
import {ApiService} from '../../services/api.service';

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

  constructor(private fb: FormBuilder, private api: ApiService) {}

  ngOnInit() {
  }

  onFormSubmit() {
    // TODO: check if form is valid

    console.log(this.pollForm.value);

    const answers = this.pollForm.value.fields
      .filter((field) => field != "")
      .map((field) => new Answer(field));

    const poll = new Poll(this.pollForm.value.title, answers);
    console.log(poll);

    // TODO: catch errors and re-route to dashboard if success
    this.api.createPoll(poll).subscribe(
      (response) => console.log(response),
      (err) => console.log(err)
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
}
