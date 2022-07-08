import { StatusCodes } from 'http-status-codes';
import * as bcrypt from 'bcryptjs';
import ErrorHandler from '../utils/ErrorHandler';
import { ILogin, ILoginService, LoginReturn } from '../interfaces/Login.interface';
import { IUserModel } from '../interfaces/User.interface';

export default class LoginService implements ILoginService {
  constructor(private _model: IUserModel) {}

  async userLogin(data: ILogin): Promise<LoginReturn> {
    const user = await this._model.getByEmail(data.email);
    const error = new ErrorHandler(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');

    if (!user) throw error;

    const isValid = await bcrypt.compare(data.password, user.password);

    if (!isValid) throw error;

    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }
}
