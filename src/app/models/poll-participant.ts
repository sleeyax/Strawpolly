import User from './user';

export class PollParticipant {
  public pollParticipantID: number;
  public participant: User;
  public hasAnswered: boolean;
  constructor(public memberID: number) {}
}
