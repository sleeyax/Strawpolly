import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Poll} from '../../models/poll';
import {StorageService} from '../../services/storage.service';
import Token from '../../helpers/token';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public polls: Poll[] = [];
  public openPolls: Poll[] = [];

  constructor(private api: ApiService, private auth: AuthenticationService) {}

  ngOnInit() {
    this.api.getPolls().subscribe(
      (res) => this.polls = res,
      (err) => console.log(err)
    );
    this.api.getOpenPolls().subscribe(
      (res) => this.openPolls = res,
      (err) => console.log(err)
    );
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

  public removeParticipant(pollID: number) {
    console.log('Removing this member as a participant of poll ' + pollID);
  }

  /**
   * Check if the current member has answered to specified poll
   * @param poll
   */
  public hasAnswered(poll: Poll) {
    return poll.vote != undefined;
  }
}
