import Match from '../database/models/Match.model';

export interface returnedMatch extends Match {
  teamHome: {
    teamName: string
  },
  teamAway: {
    teamName: string
  }
}

export type TUpdateGoals = Omit<Match, 'id' | 'inProgress' | 'homeTeam' | 'awayTeam'>;

export interface IMatchModel {
  getAll(inProgress: boolean | undefined): Promise<returnedMatch[]>
  create(data: Omit<Match, 'id' | 'inProgress'>): Promise<Match>
  updateFinished(id: number): Promise<void>
  updateGoals(id:number, data: TUpdateGoals): Promise<void>
}

export interface IMatchService {
  getAll(query: boolean | undefined): Promise<returnedMatch[]>
  create(data: Omit<Match, 'id' | 'inProgress'>): Promise<Match>
  updateFinished(id: number): Promise<void>
  updateGoals(id:number, data: TUpdateGoals): Promise<void>
}
