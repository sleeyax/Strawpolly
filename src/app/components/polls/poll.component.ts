import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss']
})
export class PollComponent implements OnInit {

  public pollId: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const id = Number.parseInt(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(id) && id != null)
      this.pollId = id;
  }
}
