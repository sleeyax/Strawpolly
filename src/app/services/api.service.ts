import {Injectable} from '@angular/core';
import {apiEndpoint} from '../config.json';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import User from '../models/user';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private api: string = `${apiEndpoint}/api`;
  private readonly membersResource: string = '/members';
  private headers: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient, private storage: StorageService) {}

  private setAuthenticationHeaders() {
    if (this.storage.token != null)
      this.headers = this.headers.set("Authorization", "Bearer " + this.storage.token);
  }

  /**
   * Log user in
   * @param user
   */
  public authenticate(user: {email: string, password: string}) {
    return this.sendPost(`${this.membersResource}/authenticate`, user);
  }

  /**
   * Sends a GET request to the specified resource
   * @param resource
   * @param options
   */
  private sendGet<T>(resource: string, options?: {auth: boolean}) {
    if (options && options.auth)
      this.setAuthenticationHeaders();
    return this.http.get<T>(`${this.api}${resource}`, {headers: this.headers});
  }

  /**
   * Sends a POST request to the specified resource
   * @param resource
   * @param data
   * @param options
   */
  private sendPost<T>(resource: string, data: Object, options?: {auth: boolean}) {
    if (options && options.auth)
      this.setAuthenticationHeaders();
    return this.http.post(`${this.api}${resource}`, data, {headers: this.headers});
  }

  /**
   * Returns all registered members
   */
  public getMembers() : Observable<User[]> {
    return this.sendGet<User[]>(this.membersResource, {auth: true});
  }

  /**
   * Creates a new member
   * @param member
   */
  public addMember(member: User) {
    return this.sendPost<User>(this.membersResource, member);
  }
}
