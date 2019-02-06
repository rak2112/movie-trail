import { Request, Response, NextFunction } from 'express';

export const awaitHandlerFactory = (middleware: Function) => {
 return (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(middleware(req, res, next))
  .catch(next);
 };
};