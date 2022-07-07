import { Request } from 'express';
import { TokenPayload } from '../types/Token.type';

export interface RequestUser extends Request{
  user?: TokenPayload
}
