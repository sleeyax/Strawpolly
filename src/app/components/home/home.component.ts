import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import Stats from '../../models/stats';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private stats: Observable<Stats> = this.api.getStats();
  public catFact: Promise<string> = this.api.getCatFact();

  constructor(private api: ApiService) {}

  ngOnInit() {}

}
