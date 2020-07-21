import { AbstractSerializableError } from './../errors/application-error';
import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  if (err instanceof AbstractSerializableError) {
    return res.status(err.statusCode).send(err.serializeErrors());
  }

  res.status(500).send({
    errors: [{ message: 'Something went wrong' }],
  });
};
