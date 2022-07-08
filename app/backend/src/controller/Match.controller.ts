import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { IMatchService } from '../interfaces/Match.interface';

export default class MatchController {
  constructor(private _service: IMatchService) {}

  async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    let query;
    if (inProgress === 'true') query = true;
    if (inProgress === 'false') query = false;

    const matches = await this._service.getAll(query as boolean | undefined);

    res.status(StatusCodes.OK).json(matches);
  }
}
