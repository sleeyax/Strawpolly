import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import {StorageService} from '../../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public formSubmitted : boolean = false;

  public loginForm: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    rememberMe: [false]
  });

  constructor(private api: ApiService, private fb: FormBuilder, private storage: StorageService) { }

  ngOnInit() {
  }

  onFormSubmit() {
    this.formSubmitted = true;
    const user = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };
    this.api.authenticate(user).subscribe(
      (response) => this.handleLoginSuccess(response),
      (error) => this.handleLoginError(error)
    );
  }

  private handleLoginError(response) {
    // TODO: show 'invalid password' etc. in form
    console.log(response.error.message || 'Login failed');
  }

  private handleLoginSuccess(response) {
    console.log(response);
    if (!response.token)
      throw 'Token not found in response!';
    // TODO: navigate back to homescreen after login
    this.storage.token = response.token;
  }
}
