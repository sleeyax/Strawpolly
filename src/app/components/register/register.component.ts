import { Component, OnInit } from '@angular/core';
import User from '../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formSubmitted : boolean = false;
  model: User = new User('', '', '', '');

  constructor() { }

  ngOnInit() {
  }

  onFormSubmit() {
    this.formSubmitted = true;
    // TODO: use api service to submit data
    console.log(this.model);
  }

}
