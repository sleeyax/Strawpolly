export class Answer {
  constructor(public answer: string) {}
}

export class Poll {
  constructor(public name: string, public answers: Answer[]) {};
}
