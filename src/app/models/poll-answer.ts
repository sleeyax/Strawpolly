export default class PollAnswer {
  public answerID: number;
  public answer: string;
  public votes: number;
  constructor(answerID: number, answer: string) {
    this.answerID = answerID;
    this.answer = answer;
  }
}
