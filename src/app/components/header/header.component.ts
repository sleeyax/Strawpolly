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

  public isLoggedIn: boolean = false;
  public username: string;

  constructor(private auth: AuthenticationService, private router: Router) {
    auth.memberIsAuthenticatedBehaviorSubject.subscribe((token) => {
      if (token) {
        this.isLoggedIn = true;
        this.username = token.getClaim('FirstName');
      }
      else {
        this.isLoggedIn = false;
      }
    });
  }

  ngOnInit() {
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
