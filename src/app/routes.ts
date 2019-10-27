import {Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {FriendsComponent} from './components/friends/friends.component';
import {PollComponent} from './components/polls/poll.component';

export const appRoutes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'polls/new', component: PollComponent},
  {path: 'polls/edit/:id', component: PollComponent},
  {path: 'friends', component: FriendsComponent}
];
