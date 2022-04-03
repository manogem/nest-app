export class UserEmailAlreadyExistsException extends Error {
  constructor(message?) {
    super(message);
    this.name = 'UserEmailAlreadyExistsException';
    this.message = message;
    this.stack = new Error().stack;
  }
}
