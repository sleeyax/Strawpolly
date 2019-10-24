import FriendStatus from './friend-status';
import User from './user';

export class Friend {
  public friendID: number;
  public friendStatus: FriendStatus;
  public friend: User;

  constructor(friendId: number, friendStatus: FriendStatus) {
    this.friendID = friendId;
    this.friendStatus = friendStatus;
  }
}
