import {Injectable} from '@angular/core';
import {apiEndpoint} from '../config.json';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import User from '../models/user';
import {Poll} from '../models/poll';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private api: string = `${apiEndpoint}/api`;
  private readonly membersResource: string = '/members';
  private readonly pollsResource: string = '/polls';

  constructor(private http: HttpClient) {}

  /**
   * Log member in
   * @param member
   */
  public authenticateMember(member: {email: string, password: string}) {
    return this.sendPost(`${this.membersResource}/authenticate`, member);
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
   */
  private sendPost<T>(resource: string, data: Object) {
    return this.http.post<T>(`${this.api}${resource}`, data);
  }

  /**
   * Sends a PUT request to the specified resource
   * @param resource
   * @param data
   */
  private sendPut<T>(resource: string, data: Object) {
    return this.http.put<T>(`${this.api}${resource}`, data);
  }

  /**
   * Sends a DELETE request to the specified resource
   * @param resource
   */
  private sendDelete<T>(resource: string) {
    return this.http.delete<T>(`${this.api}${resource}`);
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
