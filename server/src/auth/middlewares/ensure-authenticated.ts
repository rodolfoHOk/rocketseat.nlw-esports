import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { ProblemResponse } from '../errors/problem-response';

interface TokenPayload {
  sub: string;
  scopes: string[];
}

export function ensureAuthenticated(
  req: Request,
  res: Response<ProblemResponse>,
  next: NextFunction
) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({
      message: 'Authorization token not informed or invalid',
      status: 401,
    });
  }

  const token = authToken.split(' ')[1];

  try {
    const decoded = verify(
      token,
      process.env.JWT_SECRET as string
    ) as TokenPayload;

    if (decoded.scopes.includes('READ') && decoded.scopes.includes('WRITE')) {
      req.user_id = decoded.sub;
      return next();
    }

    return res.status(403).json({
      message: 'User not have permission for this operation',
      status: 403,
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      return res.status(401).json({
        message: 'Authorization token expired or invalid',
        status: 401,
      });
    }
  }
}
