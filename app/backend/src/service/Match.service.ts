import Match from '../database/models/Match.model';
import { IMatchModel, IMatchService, returnedMatch } from '../interfaces/Match.interface';

export default class MatchService implements IMatchService {
  constructor(private _model: IMatchModel) { }

  async getAll(query: boolean | undefined): Promise<returnedMatch[]> {
    const matches = await this._model.getAll(query);

    return matches;
  }

  async create(data: Omit<Match, 'id' | 'inProgress'>): Promise<Match> {
    const createdMatch = await this._model.create(data);
    return createdMatch;
  }

  async update(id: number): Promise<void> {
    await this._model.update(id);
  }
}
