import { AbstractSerializableError, CustomError } from './application-error';
const defaultErrorMessage = 'Error connecting to database';

export class DatabaseConnectionError extends AbstractSerializableError {
  readonly statusCode = 500;
  reason = defaultErrorMessage;

  constructor() {
    super(defaultErrorMessage);

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors(): CustomError {
    return {
      errors: [{ message: this.reason }],
    };
  }
}
