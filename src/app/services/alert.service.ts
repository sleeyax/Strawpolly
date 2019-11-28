import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Alert} from '../models/alert';
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
}
