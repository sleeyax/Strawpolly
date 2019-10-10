import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from '../components/login/login.component';
import {RegisterComponent} from '../components/register/register.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ButtonsModule, InputsModule} from 'angular-bootstrap-md';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonsModule,
    InputsModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent
  ]
})
export class FormsModule { }
