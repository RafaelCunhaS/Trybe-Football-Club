import { Request, Response } from 'express';
import { ILeaderboardService } from '../interfaces/Leaderboard.interface';

export default class LeaderboardController {
  constructor(private _service: ILeaderboardService) {}

  async getHomeLeaderboard(_req: Request, res: Response) {
    const leaderboard = await this._service.getHomeLeaderboard();
    return res.status(200).json(leaderboard);
  }

  async getAwayLeaderboard(_req: Request, res: Response) {
    const leaderboard = await this._service.getAwayLeaderboard();
    return res.status(200).json(leaderboard);
  }
}
