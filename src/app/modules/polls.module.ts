import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from './forms.module';
import {PollComponent} from '../components/polls/poll.component';

@NgModule({
  declarations: [
    PollComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    PollComponent
  ]
})
export class PollsModule { }
