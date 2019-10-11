import {Component, Input, OnInit} from '@angular/core';
import {StorageService} from '../../services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() title: string;

  isLoggedIn: boolean = false;

  constructor(private storage: StorageService) {
    this.isLoggedIn = this.storage.token != null;
  }

  ngOnInit() {
  }

  logout() {
    this.storage.deleteValue(this.storage.keys.TOKEN);
  }
}
