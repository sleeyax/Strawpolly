import {Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {FriendsComponent} from './components/friends/friends.component';
import {PollComponent} from './components/polls/poll.component';
import {PollVoteFormComponent} from './components/polls/poll-vote-form/poll-vote-form.component';
import {PollResultComponent} from './components/polls/poll-result/poll-result.component';
import {HomeComponent} from './components/home/home.component';

export const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'register/:key', component: RegisterComponent},
  {path: 'polls/new', component: PollComponent},
  {path: 'polls/edit/:id', component: PollComponent},
  {path: 'polls/vote/:id', component: PollVoteFormComponent},
  {path: 'polls/results/:id', component: PollResultComponent},
  {path: 'friends', component: FriendsComponent}
];
