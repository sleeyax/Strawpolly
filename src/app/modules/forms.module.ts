import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from '../components/login/login.component';
import {RegisterComponent} from '../components/register/register.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ButtonsModule, InputsModule} from 'angular-bootstrap-md';
import {RouterModule} from '@angular/router';
import {PollFormComponent} from '../components/polls/poll-form/poll-form.component';
import {FriendRequestFieldComponent} from '../components/friends/request-field/friend-request-field.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {PollVoteFormComponent} from '../components/polls/poll-vote-form/poll-vote-form.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    PollFormComponent,
    FriendRequestFieldComponent,
    PollVoteFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonsModule,
    InputsModule,
    RouterModule,
    NgSelectModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    PollFormComponent,
    FriendRequestFieldComponent,
    PollVoteFormComponent
  ]
})
export class FormsModule { }
