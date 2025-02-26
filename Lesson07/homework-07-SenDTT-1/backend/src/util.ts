export class ErrorWithStatus extends Error {
  status?: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.status = statusCode;
  }
}