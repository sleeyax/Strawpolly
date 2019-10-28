import User from './user';

export class PollParticipant {
  public memberID: number;
  public participant: User;
  constructor(memberID: number) {
    this.memberID = memberID;
  }
}
