import {Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {HomeComponent} from './components/home/home.component';
import {PollFormComponent} from './components/polls/poll-form/poll-form.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {FriendsComponent} from './components/friends/friends.component';

export const appRoutes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'polls/new', component: PollFormComponent},
  {path: 'polls/edit/:id', component: PollFormComponent},
  {path: 'friends', component: FriendsComponent}
];
