import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Poll} from '../../models/poll';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public polls: Poll[] = [];

  constructor(private api: ApiService, private router: Router) {
    this.api.getPolls().subscribe(
      (res) => this.polls = res,
      (err) => console.log(err)
    );
  }

  ngOnInit() {
  }

  public shorten(answer: string, length: number = 30) {
    return answer.length <= length ? answer : answer.substring(0, length) + "..."
  }

  public deletePoll(pollID: number) {
    this.api.deletePoll(pollID).subscribe((res) => {
      console.log(res);
      // 'refresh' page
      this.polls = this.polls.filter(poll => poll.pollID != pollID);
    }, err => console.error(err));
  }
}
