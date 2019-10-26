import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ButtonsModule,
  DropdownModule,
  MdbTableDirective,
  MdbTableRowDirective,
  MdbTableSortDirective,
  TableModule
} from 'angular-bootstrap-md';
import {FriendsComponent} from '../components/friends/friends.component';
import {FriendsActionButtonComponent} from '../components/friends/action-button/friends-action-button.component';
import {FriendsListComponent} from '../components/friends/list/friends-list.component';
import {FormsModule} from './forms.module';

@NgModule({
  declarations: [
    FriendsComponent,
    FriendsActionButtonComponent,
    FriendsListComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    ButtonsModule,
    DropdownModule,
    FormsModule
  ],
  exports: [
    FriendsComponent
  ]
})
export class FriendsModule { }
