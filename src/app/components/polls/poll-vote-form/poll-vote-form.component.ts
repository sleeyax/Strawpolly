import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../../services/api.service';
import {Poll} from '../../../models/poll';
import {FormBuilder, FormGroup} from '@angular/forms';
import PollVote from '../../../models/poll-vote';

@Component({
  selector: 'app-poll-vote-form',
  templateUrl: './poll-vote-form.component.html',
  styleUrls: ['./poll-vote-form.component.scss']
})
export class PollVoteFormComponent implements OnInit {

  public poll: Poll;
  public pollVoteForm: FormGroup;
  public isUpdate = false;

  constructor(private route: ActivatedRoute, private api: ApiService, private fb: FormBuilder, private router: Router) {
    this.pollVoteForm = this.fb.group({
      option: ['']
    });
  }

  ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(id) && id != null)
      this.api.getOpenPoll(id).subscribe(
        res => {
          this.poll = res;
          if (this.poll.vote != null && this.poll.answers.some(a => a.answerID == this.poll.vote.answerID))
            this.isUpdate = true;
        },
        err => console.error(err)
      );
  }

  public onFormSubmit() {
    const option = this.pollVoteForm.value.option;
    if (option != "")
      this.submitVote(this.poll.pollID, option);
  }

  private submitVote(pollId: number, answerId: number) {
    let pollVote = new PollVote(pollId, answerId);
    let request = this.api.submitVote(pollVote);

    if (this.isUpdate) {
      pollVote.voteID = this.poll.vote.voteID;
      request = this.api.editVote(pollVote);
    }

    request.subscribe(
      res => {
        console.log(res);
        this.router.navigateByUrl('/dashboard');
      } ,
      err => console.error(err)
    );
  }
}
