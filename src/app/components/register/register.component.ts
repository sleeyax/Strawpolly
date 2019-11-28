import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatchFieldsValidator} from '../../validators/match-fields-validator';
import EmailValidator from '../../validators/email-validator';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public formSubmitted : boolean = false;
  public registrationForm: FormGroup = this.fb.group({
    creationKey: [null],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, EmailValidator]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    repeatPassword: ['', [Validators.required, Validators.minLength(8)]]
  }, {
    validator: MatchFieldsValidator('password', 'repeatPassword')
  });

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private alert: AlertService
  ) {}

  ngOnInit() {
    const creationKey = this.route.snapshot.paramMap.get('key');
    if (creationKey)
      this.updateFields(creationKey);
  }

  onFormSubmit() {
    this.formSubmitted = true;

    if (this.registrationForm.invalid)
      return;

    this.api.addMember(this.registrationForm.value)
      .subscribe((response) => {
        console.log(response);
        this.router.navigateByUrl('/login');
      }, err => this.alert.showError(err));
  }

  private updateFields(creationKey: string) {
    this.api.getMemberEmail(creationKey).subscribe(email => {
      this.registrationForm.controls.creationKey.setValue(creationKey);
      this.registrationForm.controls.email.setValue(email);
    }, err => {
      console.error(err);
      this.alert.showError(err);
    });
  }

  get form() {
    return this.registrationForm.controls;
  }
}
