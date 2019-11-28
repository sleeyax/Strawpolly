import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HeaderModule} from './modules/header.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import {appRoutes} from './routes';
import {debug} from './config.json';
import {FormsModule} from '@angular/forms';
import {FormsModule as MyReactiveFormsModule} from './modules/forms.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {SecurityInterceptor} from './services/interceptors/security.interceptor.service';
import {DashboardModule} from './modules/dashboard.module';
import {FriendsModule} from './modules/friends.module';
import {PollsModule} from './modules/polls.module';
import { AlertComponent } from './components/alert/alert.component';
import {UiModule} from './modules/ui.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot(appRoutes, { enableTracing: debug }),
    FormsModule,
    HeaderModule,
    DashboardModule,
    FriendsModule,
    UiModule,
    PollsModule,
    MyReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: SecurityInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
