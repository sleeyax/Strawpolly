import User from './user';
import PollAnswer from './poll-answer';
import {PollParticipant} from './poll-participant';

export class Poll {
  public creator: User;
  constructor(public pollID: number, public name: string, public answers: PollAnswer[], public participants: PollParticipant[]) {};
}
