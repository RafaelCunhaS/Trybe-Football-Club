// import { Op } from 'sequelize';
import Team from '../database/models/Team.model';
import Match from '../database/models/Match.model';
import { IMatchModel, returnedMatch } from '../interfaces/Match.interface';

export default class MatchRepository implements IMatchModel {
  constructor(private _model = Match) { }

  async getAll(inProgress: boolean | undefined): Promise<returnedMatch[]> {
    let matches;
    if (inProgress !== undefined) {
      matches = await this._model.findAll({ where: { inProgress },
        include: [
          { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
          { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
        ],
      });
    } else {
      matches = await this._model.findAll({
        include: [
          { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
          { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
        ],
      });
    }

    return matches as returnedMatch[];
  }
}
