import { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { RequestUser } from '../interfaces/RequestUser.interface';
import ErrorHandler from '../utils/ErrorHandler';

dotenv.config();

export default async (req: RequestUser, _res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) throw new ErrorHandler(StatusCodes.UNAUTHORIZED, 'Token not found');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as jwt.Secret) as JwtPayload;

    req.user = decoded.data;

    next();
  } catch (err) {
    throw new ErrorHandler(StatusCodes.UNAUTHORIZED, 'Invalid token');
  }
};
