import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { ITeamService } from '../interfaces/Team.interface';

export default class TeamController {
  constructor(private _service: ITeamService) {}

  async getAll(_req: Request, res: Response) {
    const teams = await this._service.getAll();

    res.status(StatusCodes.OK).json(teams);
  }
}
