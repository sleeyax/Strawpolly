import User from './user';
import PollAnswer from './poll-answer';
import {PollParticipant} from './poll-participant';
import PollVote from './poll-vote';

export class Poll {
  public creator: User;
  public vote: PollVote;
  constructor(public pollID: number, public name: string, public answers: PollAnswer[], public participants: PollParticipant[]) {};
}
