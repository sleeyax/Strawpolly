import {Component, Input, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() title: string;

  isLoggedIn: boolean = false;

  constructor(private auth: AuthenticationService, private router: Router) {
    auth.memberIsAuthenticatedBehaviorSubject.subscribe((value) => this.isLoggedIn = value);
  }

  ngOnInit() {
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
