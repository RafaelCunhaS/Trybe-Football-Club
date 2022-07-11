import { ILeaderboard,
  ILeaderboardModel, ILeaderboardService } from '../interfaces/Leaderboard.interface';

export default class LeaderboardService implements ILeaderboardService {
  constructor(private _model: ILeaderboardModel) {}

  async getHomeLeaderboard(): Promise<ILeaderboard[]> {
    const leaderboard = await this._model.getHomeLeaderboard();
    return leaderboard;
  }

  async getAwayLeaderboard(): Promise<ILeaderboard[]> {
    const leaderboard = await this._model.getAwayLeaderboard();
    return leaderboard;
  }

  async getAll(): Promise<ILeaderboard[]> {
    const leaderboard = await this._model.getAll();
    return leaderboard;
  }
}
