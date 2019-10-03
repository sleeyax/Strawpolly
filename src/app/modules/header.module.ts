import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from '../components/header/header.component';
import {DropdownModule, IconsModule, NavbarModule} from 'angular-bootstrap-md';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    NavbarModule,
    IconsModule,
    DropdownModule,
    RouterModule
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
