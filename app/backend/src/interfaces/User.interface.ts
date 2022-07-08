import User from '../database/models/User.model';

export interface IUserModel {
  getByEmail(email: string): Promise<User | null>
}
