import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ApiService} from './api.service';
import {StorageService} from './storage.service';
import Token from '../helpers/token';

@Injectable({
  providedIn: 'root'
})
/**
 * Member authentication service
 * Authenticates members, stores tokens and provides access to API resources
 */
export class AuthenticationService {
  public memberIsAuthenticatedBehaviorSubject: BehaviorSubject<Token> = new BehaviorSubject(this.getCurrentToken());

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
    this.memberIsAuthenticatedBehaviorSubject.next(new Token(response.token));
  }

  /**
   * Log member out
   */
  public logout() {
    this.storage.deleteValue(this.storage.keys.TOKEN);

    // Let all subscribers know the member signed out
    this.memberIsAuthenticatedBehaviorSubject.next(null);
  }

  /**
   * Returns the token from storage or null if it doesn't exist or is invalid
   */
  private getCurrentToken() {
    const token = this.storage.token;

    if (!token) return null;

    try {
      return new Token(token);
    }
    // token is malformed
    catch (e) {
      this.storage.deleteValue(this.storage.keys.TOKEN);
      return null;
    }
  }
}
