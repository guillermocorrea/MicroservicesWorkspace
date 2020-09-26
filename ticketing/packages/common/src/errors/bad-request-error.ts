import { AbstractSerializableError, CustomError } from './application-error';

export class BadRequestError extends AbstractSerializableError {
  statusCode = 400;

  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors(): CustomError {
    return { errors: [{ message: this.message }] };
  }
}
