import { StatusCodes } from 'http-status-codes';
import ErrorHandler from '../utils/ErrorHandler';
import { ILogin, ILoginService, LoginReturn } from '../interfaces/Login.interface';
import { IUserModel } from '../interfaces/User.interface';

export default class LoginService implements ILoginService {
  constructor(private _model: IUserModel) {}

  async userLogin(data: ILogin): Promise<LoginReturn> {
    const user = await this._model.getByEmail(data.email);

    if (!user || user.password !== data.password) {
      throw new ErrorHandler(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }
}
