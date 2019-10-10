import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private memeberCount: number;

  constructor(private api: ApiService) {
    this.api.getMembers().subscribe((users) => {
      this.memeberCount = users.length;
    })
  }

  ngOnInit() {
  }

}
