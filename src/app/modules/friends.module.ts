import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FriendsListComponent} from '../components/friends.list/friends.list.component';
import {FriendsComponent} from '../components/friends/friends.component';

@NgModule({
  declarations: [
    FriendsListComponent,
    FriendsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FriendsListComponent
  ]
})
export class FriendsModule { }
