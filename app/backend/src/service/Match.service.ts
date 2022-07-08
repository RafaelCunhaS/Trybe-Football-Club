import { IMatchModel, IMatchService, returnedMatch } from '../interfaces/Match.interface';

export default class MatchRepository implements IMatchService {
  constructor(private _model: IMatchModel) { }

  async getAll(query: string): Promise<returnedMatch[]> {
    const matches = await this._model.getAll(query);

    return matches;
  }
}
