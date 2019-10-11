import {Injectable} from '@angular/core';
import {apiEndpoint} from '../config.json';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import User from '../models/user';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private api: string = `${apiEndpoint}/api`;
  private readonly membersResource: string = '/members';

  constructor(private http: HttpClient, private storage: StorageService) {}

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
  private sendGet<T>(resource: string) {
    return this.http.get<T>(`${this.api}${resource}`);
  }

  /**
   * Sends a POST request to the specified resource
   * @param resource
   * @param data
   * @param options
   */
  private sendPost<T>(resource: string, data: Object) {
    return this.http.post(`${this.api}${resource}`, data);
  }

  /**
   * Returns all registered members
   */
  public getMembers() : Observable<User[]> {
    return this.sendGet<User[]>(this.membersResource);
  }

  /**
   * Creates a new member
   * @param member
   */
  public addMember(member: User) {
    return this.sendPost<User>(this.membersResource, member);
  }
}
