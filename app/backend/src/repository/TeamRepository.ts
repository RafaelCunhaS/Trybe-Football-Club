import Team from '../database/models/Team.model';
import { ITeamModel } from '../interfaces/Team.interface';

export default class TeamRepository implements ITeamModel {
  constructor(private _model = Team) { }

  async getAll(): Promise<Team[]> {
    const teams = await this._model.findAll();

    return teams;
  }
}
