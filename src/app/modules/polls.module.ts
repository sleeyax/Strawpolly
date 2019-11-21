import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from './forms.module';
import {PollComponent} from '../components/polls/poll.component';
import {PollResultComponent} from '../components/polls/poll-result/poll-result.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    PollComponent,
    PollResultComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  exports: [
    PollComponent
  ]
})
export class PollsModule { }
