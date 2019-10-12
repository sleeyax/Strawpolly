export default class Token {
  private header: object;
  private payload: object;
  private signature: string;

  constructor(token: string) {
    if (token != null)
      this.parseToken(token);
  }

  private parseToken(token: string) {
    const splitted = token.split('.');
    this.header = JSON.parse(atob(splitted[0]));
    this.payload = JSON.parse(atob(splitted[1]));
    this.signature = splitted[2];
  }

  getClaim(key: string) {
    return this.payload[key];
  }
}
