import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../services/api.service';
import {ActivatedRoute} from '@angular/router';
import {parseArguments} from '@angular/cli/models/parser';
import {Poll} from '../../../models/poll';
import PollAnswer from '../../../models/poll-answer';

@Component({
  selector: 'app-poll-result',
  templateUrl: './poll-result.component.html',
  styleUrls: ['./poll-result.component.scss']
})
export class PollResultComponent implements OnInit {
  public poll: Poll;
  public percentage: string;

  constructor(private api: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    const pollId = Number.parseInt(this.route.snapshot.paramMap.get('id'));
    this.api.getPollVoteResults(pollId).subscribe(res => {
      this.poll = res;
      this.poll.answers = this.poll.answers.sort((a, b) => b.votes - a.votes);
      this.percentage = this.calcVoteCompletion() + '%';
      console.log(this.poll.answers);
    }, err => console.error(err));
  }

  private calcVoteCompletion() {
    const votesCount = this.poll.answers.reduce((a, b) => a + b.votes, 0);
    return (votesCount / this.poll.participants.length) * 100;
  }
}
