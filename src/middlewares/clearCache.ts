import { Request, Response, NextFunction } from 'express';
import { clearHash } from '../services/cache';


const clearCache = async (req: Request, res: Response, next: NextFunction) => {
  await next();
  clearHash(req.user.id);
};

export default clearCache;
