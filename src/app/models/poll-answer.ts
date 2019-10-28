export default class PollAnswer {
  public answerID: number;
  public answer: string;
  constructor(answerID: number, answer: string) {
    this.answerID = answerID;
    this.answer = answer;
  }
}
