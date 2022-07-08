import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { IMatchService } from '../interfaces/Match.interface';

export default class MatchController {
  constructor(private _service: IMatchService) {}

  async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    const matches = await this._service.getAll(inProgress as string);

    res.status(StatusCodes.OK).json(matches);
  }
}
