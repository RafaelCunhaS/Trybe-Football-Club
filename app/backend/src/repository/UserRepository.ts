import Users from '../database/models/User.model';
import { IUser, IUserModel } from '../interfaces/User.interface';

export default class UserRepository implements IUserModel {
  constructor(private _model = Users) { }

  async getByEmail(email: string): Promise<IUser | null> {
    const user = await this._model.findOne({ where: { email } });

    return user;
  }
}
