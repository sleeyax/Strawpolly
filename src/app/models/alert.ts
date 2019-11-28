export class Alert {
  constructor(public type: string, public msg: string) {}
}

export class AlertTypes {
  public static readonly ERROR: string = 'danger';
  public static readonly INFO: string = 'primary';
  public static readonly WARNING: string = 'warning';
  public static readonly NEUTRAL: string = 'secondary';
}
