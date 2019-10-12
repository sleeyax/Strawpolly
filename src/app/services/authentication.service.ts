import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ApiService} from './api.service';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root'
})
/**
 * Member authentication service
 * Authenticates members, stores tokens and provides access to API resources
 */
export class AuthenticationService {
  public memberIsAuthenticatedBehaviorSubject: BehaviorSubject<boolean> = new BehaviorSubject(this.storage.token != null);

  constructor(private api: ApiService, private storage: StorageService) { }

  /**
   * Log member in
   * @param email
   * @param password
   * @param onError
   * @param onSuccess
   */
  public login(email: string, password: string, onError?, onSuccess?) {
    this.api.authenticateMember({email: email, password: password}).subscribe(
      (response) => {
        this.handleLoginSuccess(response);
        if (onSuccess) onSuccess(response);
      },
      (error) => {
        this.handleLoginError(error);
        if (onError) onError(error);
      }
    );
  }

  private handleLoginError(response) {
    console.log(response.error.message || 'Login failed');
  }

  private handleLoginSuccess(response) {
    console.log(response);

    if (!response.token)
      throw 'Token not found in response!';

    this.storage.token = response.token;

    // let all subscribers know the login was successful
    this.memberIsAuthenticatedBehaviorSubject.next(true);
  }

  /**
   * Log member out
   */
  public logout() {
    this.storage.deleteValue(this.storage.keys.TOKEN);

    // Let all subscribers know the member signed out
    this.memberIsAuthenticatedBehaviorSubject.next(false);
  }
}
