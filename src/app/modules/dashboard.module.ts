import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {DashboardComponent} from '../components/dashboard/dashboard.component';
import {CardsModule} from 'angular-bootstrap-md';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CardsModule
  ],
  exports: [
    DashboardComponent
  ],
})
export class DashboardModule { }
