import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Token from '../utils/Token';
import { ILoginService } from '../interfaces/Login.interface';

export default class LoginController {
  constructor(private loginService: ILoginService) { }

  async checkUser(req: Request, res: Response) {
    const { id, role, email } = await this.loginService.validateUser(req.body);

    const token = new Token().generate(id, role, email);

    res.status(StatusCodes.OK).json({ token });
  }
}
