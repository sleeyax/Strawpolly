import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

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
    email: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const key = params.get('key');
      this.updateFields(key);
    });
  }

  onFormSubmit() {
    this.formSubmitted = true;
    this.api.addMember(this.registrationForm.value)
      .subscribe((response) => {
        console.log(response);
        this.router.navigateByUrl('/login');
      });
  }

  private updateFields(creationKey: string) {
    this.api.getMemberEmail(creationKey).subscribe(email => {
      this.registrationForm.controls.creationKey.setValue(creationKey);
      this.registrationForm.controls.email.setValue(email);
    }, err => console.error(err));
  }
}
