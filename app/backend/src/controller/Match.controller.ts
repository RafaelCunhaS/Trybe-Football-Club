import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { IMatchService } from '../interfaces/Match.interface';
import ErrorHandler from '../utils/ErrorHandler';

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

  async create(req: Request, res: Response) {
    const { homeTeam, awayTeam } = req.body;

    if (homeTeam === awayTeam) {
      throw new ErrorHandler(
        StatusCodes.UNAUTHORIZED,
        'It is not possible to create a match with two equal teams',
      );
    }

    const createdMatch = await this._service.create(req.body);

    res.status(StatusCodes.CREATED).json(createdMatch);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    await this._service.update(Number(id));

    res.status(200).json({ message: 'Finished' });
  }
}
