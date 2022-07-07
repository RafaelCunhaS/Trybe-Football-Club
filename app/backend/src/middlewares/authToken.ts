import { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { RequestUser } from '../interfaces/RequestUser.interface';
import ErrorHandler from '../utils/ErrorHandler';

export default async (req: RequestUser, _res: Response, next: NextFunction) => {
  const JWT_SECRET = 'senhasupersecreta';
  const token = req.headers.authorization;

  if (!token) throw new ErrorHandler(StatusCodes.UNAUTHORIZED, 'Token not found');

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    req.user = decoded.data;

    next();
  } catch (err) {
    throw new ErrorHandler(StatusCodes.UNAUTHORIZED, 'Invalid token');
  }
};
