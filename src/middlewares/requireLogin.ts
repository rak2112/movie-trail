import { Request, Response, NextFunction } from 'express';

const requireLogin = (req: Request, res: Response, next: NextFunction) => {
  console.log('reqqqqq in middlewareeee.......', req.user);
  if (!req.user) {
    return res.status(401).send({ error: 'You must log in to perform this action!' });
  }

  next();
};

export default requireLogin;
