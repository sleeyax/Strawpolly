import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, Validators} from '@angular/forms';

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

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
  }

  onFormSubmit() {
    // TODO: submit form
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
