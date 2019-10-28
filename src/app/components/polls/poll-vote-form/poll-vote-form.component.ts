import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../../services/api.service';
import {Poll} from '../../../models/poll';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-poll-vote-form',
  templateUrl: './poll-vote-form.component.html',
  styleUrls: ['./poll-vote-form.component.scss']
})
export class PollVoteFormComponent implements OnInit {

  public poll: Poll;
  public pollVoteForm: FormGroup;

  constructor(private route: ActivatedRoute, private api: ApiService, private fb: FormBuilder) {
    this.pollVoteForm = this.fb.group({
      option: ['']
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = parseInt(params.get('id'));
      if (!isNaN(id) && id != null)
        this.api.getInvitedPoll(id).subscribe(
          res => this.poll = res,
          err => console.error(err)
        );
    });
  }

  public onFormSubmit() {
    console.log(this.pollVoteForm);
  }
}