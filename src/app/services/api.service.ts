import {Injectable} from '@angular/core';
import {apiEndpoint} from '../config.json';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import User from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private api: string = `${apiEndpoint}/api`;
  private readonly membersResource: string = '/members';

  constructor(private http: HttpClient) { }

  /**
   * Sends a GET request to the specified resource
   * @param resource
   */
  private sendGet<T>(resource: string) {
    return this.http.get<T>(`${this.api}${resource}`);
  }

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
