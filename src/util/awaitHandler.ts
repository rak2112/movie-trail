import { Request, Response, NextFunction } from 'express';

const awaitHandlerFactory = (middleware: Function) => {
 return (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(middleware(req, res, next))
  .catch(next);
 };
};


export default awaitHandlerFactory;