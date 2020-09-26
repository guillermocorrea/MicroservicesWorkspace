import { AbstractSerializableError } from './application-error';

export class NotFoundError extends AbstractSerializableError {
  statusCode = 404;
  constructor() {
    super('Route not found');

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return { errors: [{ message: 'Not found' }] };
  }
}
