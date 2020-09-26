export interface CustomError {
  errors: { message: string; field?: string }[];
}

export abstract class AbstractSerializableError extends Error {
  abstract readonly statusCode: number;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, AbstractSerializableError.prototype);
  }

  abstract serializeErrors(): CustomError;
}
