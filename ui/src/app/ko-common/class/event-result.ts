export class EventResult {
  success: boolean;
  msg: string;

  constructor(success: boolean, msg: string) {
    this.success = success;
    this.msg = msg;
  }
}
