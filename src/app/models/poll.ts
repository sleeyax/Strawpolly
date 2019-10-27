export class Poll {
  constructor(public pollID: number, public name: string, public answers: string[], public participantIds: number[]) {};
}
