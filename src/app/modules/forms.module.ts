import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from '../components/login/login.component';
import {RegisterComponent} from '../components/register/register.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ButtonsModule, InputsModule} from 'angular-bootstrap-md';
import {RouterModule} from '@angular/router';
import {PollFormComponent} from '../components/poll.form/poll.form.component';
import {FriendRequestFieldComponent} from '../components/friends/request-field/friend-request-field.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    PollFormComponent,
    FriendRequestFieldComponent
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
    PollFormComponent,
    FriendRequestFieldComponent
  ]
})
export class FormsModule { }
