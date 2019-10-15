import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Poll} from '../../models/poll';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public polls: Poll[] = [];

  constructor(private api: ApiService) {
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
}
