import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  public friendStateBehaviourSubject: BehaviorSubject<FriendAction> = new BehaviorSubject(null);
  constructor() { }
}

export enum FriendAction {
  // invite sent via email
  inviteSent,
  // accepted or declined incoming FR
  friendRequestHandled
}
