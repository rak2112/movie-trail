import { Request, Response, NextFunction } from 'express';

export const apiErrorHandler = (error: Error, req: Request, res: Response, next: NextFunction,) => {
  console.error(error.stack)
  res.status(500).send(error.message || error.toString())
}
