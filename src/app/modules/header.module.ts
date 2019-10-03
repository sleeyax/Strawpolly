import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from '../components/header/header.component';
import {DropdownModule, IconsModule, NavbarModule} from 'angular-bootstrap-md';

@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    NavbarModule,
    IconsModule,
    DropdownModule,
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
