import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import Stats from '../../models/stats';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private stats: Stats;
  public catFact: Promise<string> = this.api.getCatFact();

  constructor(private api: ApiService) {
    this.api.getStats().subscribe(
      res => this.stats = res,
      err => console.error(err)
    );
  }

  ngOnInit() {}

}
