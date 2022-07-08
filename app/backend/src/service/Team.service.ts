// import { StatusCodes } from 'http-status-codes';
// import ErrorHandler from '../utils/ErrorHandler';
import { ITeamService, ITeamModel } from '../interfaces/Team.interface';
import Team from '../database/models/Team.model';

export default class TeamService implements ITeamService {
  constructor(private _model: ITeamModel) {}

  async getAll(): Promise<Team[]> {
    const teams = await this._model.getAll();

    return teams;
  }
}
