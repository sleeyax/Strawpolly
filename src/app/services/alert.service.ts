import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Alert, AlertTypes} from '../models/alert';
import {NavigationStart, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  public alertSubject: Subject<Alert> = new Subject();

  constructor(private router: Router) {
    // clear alert messages on route change
    router.events.subscribe(event => {
      if (event instanceof NavigationStart)
        this.alertSubject.next(null);
    });
  }

  public show(type: string, msg: string) {
    this.alertSubject.next(new Alert(type, msg));
  }

  public showError(msg: string) {
    this.show(AlertTypes.ERROR, msg);
  }

  public showUnexpectedError() {
    this.show(AlertTypes.ERROR, 'Whoops! An unexpected error occurred! See console log for details');
  }

  public showInfo(msg: string) {
    this.show(AlertTypes.INFO, msg);
  }

  public showSuccess(msg: string) {
    this.show(AlertTypes.SUCCESS, msg);
  }

  public showNeutral(msg: string) {
    this.show(AlertTypes.NEUTRAL, msg);
  }

  public showWarning(msg: string) {
    this.show(AlertTypes.WARNING, msg);
  }
}
