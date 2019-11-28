import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import {AlertService} from '../../services/alert.service';
import {AlertTypes} from '../../models/alert';

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

  constructor(
    private auth: AuthenticationService,
    private fb: FormBuilder,
    private router: Router,
    private alert: AlertService
  ) {}

  ngOnInit() {
  }

  onFormSubmit() {
    this.formSubmitted = true;
    this.auth.login(
      this.loginForm.value.email,
      this.loginForm.value.password,
      (err) => {
        // TODO: show login failed error in form
        this.formSubmitted = false;
        console.log(err);
        this.alert.show(AlertTypes.ERROR, err);
      },
      (response) => {
        // ...
        this.router.navigateByUrl('/dashboard');
      }
    );
  }
}
