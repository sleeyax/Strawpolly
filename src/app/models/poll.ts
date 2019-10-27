import {PollParticipant} from './poll-participant';

export class Answer {
  constructor(public answer: string) {}
}

export class Poll {
  constructor(public pollID: number, public name: string, public answers: Answer[], public participantIds: PollParticipant[]) {};
}
