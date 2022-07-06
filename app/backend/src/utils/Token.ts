import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import { Secret } from 'jsonwebtoken';

dotenv.config();

export default class Token {
  private _jwtConfig: jwt.SignOptions;

  constructor() {
    this._jwtConfig = {
      expiresIn: '1d',
    };
  }

  public generate(userId: number, role: string, email: string): string {
    return jwt.sign(
      { data: { userId, email } },
      (process.env.JWT_SECRET as Secret),
      this._jwtConfig,
    );
  }
}
