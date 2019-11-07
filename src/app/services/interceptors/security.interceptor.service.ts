import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import {StorageService} from '../storage.service';
import {AuthenticationService} from '../authentication.service';

@Injectable({
  providedIn: 'root'
})

export class SecurityInterceptor implements HttpInterceptor {
  constructor(private router: Router, private storage: StorageService, private auth: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.storage.token;

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token
        }
      });
    }

    return next.handle(request).pipe(
      catchError(err => {
        if (err.status === 401) {
          // token was modified by l33t hacker, log out
          if (token) this.auth.logout();

          this.router.navigate(['login']);
        }

        return throwError(err.error);
      }));
  }
}
