import { Op } from 'sequelize';
import Team from '../database/models/Team.model';
import Match from '../database/models/Match.model';
import { IMatchModel, returnedMatch } from '../interfaces/Match.interface';

export default class MatchRepository implements IMatchModel {
  constructor(private _model = Match) { }

  async getAll(query: string): Promise<returnedMatch[]> {
    const matches = await this._model.findAll({ where: {
      [Op.or]: [
        { inProgress: query || '' },
      ],
    },
    include: [{ model: Team, as: 'teamHome', attributes: { exclude: ['id'] } }],
    });

    return matches as returnedMatch[];
  }
}
