import {Injectable} from '@angular/core';
import {apiEndpoint} from '../config.json';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import User from '../models/user';
import {Poll} from '../models/poll';
import {Friend} from '../models/friend';
import PollVote from '../models/poll-vote';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private api: string = `${apiEndpoint}/api`;
  private readonly membersResource: string = '/members';
  private readonly pollsResource: string = '/polls';
  private readonly friendsResource: string = '/friends';
  private readonly voteResource: string = '/vote';

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

  /**
   * Add a new poll
   * @param poll
   */
  public createPoll(poll: Poll) {
    return this.sendPost<Poll>(this.pollsResource, poll);
  }

  /**
   * Returns a list of all polls
   */
  public getPolls() {
    return this.sendGet<Poll[]>(this.pollsResource);
  }

  /**
   * Get a specific poll
   * @param pollId
   */
  public getPoll(pollId: number) {
    return this.sendGet<Poll>(`${this.pollsResource}/${pollId}`);
  }

  /**
   * Get poll member is invited to
   * @param pollId
   */
  public getOpenPoll(pollId: number) {
    return this.sendGet<Poll>(`${this.pollsResource}/open/${pollId}`);
  }

  /**
   * Get all polls current member is invited to
   */
  public getOpenPolls() {
    return this.sendGet<Poll[]>(`${this.pollsResource}/open`);
  }

  /**
   * Edit pollId
   * @param poll
   */
  public editPoll(poll: Poll) {
    return this.sendPut<Poll>(`${this.pollsResource}/${poll.pollID}`, poll);
  }

  /**
   * Delete pollId with specified id
   * @param pollId
   */
  public deletePoll(pollId: number) {
    return this.sendDelete(`${this.pollsResource}/${pollId}`);
  }

  /**
   * Returns a list of all friends (of all FriendStatuses)
   */
  public getFriends() {
    return this.sendGet<Friend[]>(`${this.friendsResource}`);
  }

  /**
   * Returns a list of all accepted friends
   */
  public getVerifiedFriends() {
    return this.sendGet<Friend[]>(`${this.friendsResource}/accepted`);
  }

  /**
   * Returns a list of incoming friend requests
   */
  public getFriendRequests() {
    return this.sendGet<Friend[]>(`${this.friendsResource}/requests`);
  }

  /**
   * Edit friend relationship (status)
   * @param friend
   */
  public editFriend(friend: Friend) {
    return this.sendPut(`${this.friendsResource}/${friend.friendID}`, friend);
  }

  /**
   * Delete friends relationship
   * @param friendID
   */
  public deleteFriend(friendID: number) {
    return this.sendDelete(`${this.friendsResource}/${friendID}`);
  }

  /**
   * Mass-add friends by email
   * @param friendEmails
   */
  public addFriendsByEmail(friendEmails: string[]) {
    return this.sendPost(`${this.friendsResource}`, {friendEmails});
  }

  /**
   * Vote on a poll
   * @param vote
   */
  public submitVote(vote: PollVote) {
    return this.sendPost(`${this.voteResource}`, vote);
  }

  /**
   * Change answer on a specific poll
   * @param vote
   */
  public editVote(vote: PollVote) {
    return this.sendPut(`${this.voteResource}`, vote);
  }
}
