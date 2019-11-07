import User from './user';

export class PollParticipant {
  public pollParticipantID: number;
  public participant: User;
  constructor(public memberID: number) {}
}
