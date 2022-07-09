import { StatusCodes } from 'http-status-codes';
import { ITeamModel } from '../interfaces/Team.interface';
import Match from '../database/models/Match.model';
import { IMatchModel, IMatchService, returnedMatch } from '../interfaces/Match.interface';
import ErrorHandler from '../utils/ErrorHandler';

export default class MatchService implements IMatchService {
  constructor(private _model: IMatchModel, private _teamModel: ITeamModel) { }

  async getAll(query: boolean | undefined): Promise<returnedMatch[]> {
    const matches = await this._model.getAll(query);

    return matches;
  }

  async create(data: Omit<Match, 'id' | 'inProgress'>): Promise<Match> {
    const homeTeam = await this._teamModel.getById(data.homeTeam);
    const awayTeam = await this._teamModel.getById(data.awayTeam);
    if (!homeTeam || !awayTeam) {
      throw new ErrorHandler(StatusCodes.NOT_FOUND, 'There is no team with such id!');
    }

    const createdMatch = await this._model.create(data);
    return createdMatch;
  }

  async update(id: number): Promise<void> {
    await this._model.update(id);
  }
}
