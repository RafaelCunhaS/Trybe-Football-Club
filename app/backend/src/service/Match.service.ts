import { IMatchModel, IMatchService, returnedMatch } from '../interfaces/Match.interface';

export default class MatchService implements IMatchService {
  constructor(private _model: IMatchModel) { }

  async getAll(query: boolean | undefined): Promise<returnedMatch[]> {
    const matches = await this._model.getAll(query);

    return matches;
  }
}
