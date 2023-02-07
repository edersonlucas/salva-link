export default class ErrorGenerator extends Error {
  constructor(public code: number, public message: string) {
    super(message);
    this.code = code;
    this.message = message;
  }
}
