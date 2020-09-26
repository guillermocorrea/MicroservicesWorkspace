import { AbstractSerializableError, CustomError } from './application-error';
import { ValidationError } from 'express-validator';

export class RequestValidationError extends AbstractSerializableError {
  readonly statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super('Validation error');

    // Set the prototype explicitly
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors(): CustomError {
    return {
      errors: this.errors.map((error) => ({
        message: error.msg,
        field: error.param,
      })),
    };
  }
}
