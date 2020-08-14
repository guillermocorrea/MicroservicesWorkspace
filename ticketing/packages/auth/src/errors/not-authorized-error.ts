import { AbstractSerializableError, CustomError } from './application-error';

const errorMessage = 'Not authorized';

export class NotAuthorizedError extends AbstractSerializableError {
  statusCode = 401;

  constructor() {
    super(errorMessage);

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors(): CustomError {
    return { errors: [{ message: errorMessage }] };
  }
}
