import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from '../components/login/login.component';
import {RegisterComponent} from '../components/register/register.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ButtonsModule, InputsModule} from 'angular-bootstrap-md';
import {RouterModule} from '@angular/router';
import {PollFormComponent} from '../components/poll.form/poll.form.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    PollFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonsModule,
    InputsModule,
    RouterModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    PollFormComponent
  ]
})
export class FormsModule { }
