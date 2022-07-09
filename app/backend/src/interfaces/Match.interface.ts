import Match from '../database/models/Match.model';

export interface returnedMatch extends Match {
  teamHome: {
    teamName: string
  },
  teamAway: {
    teamName: string
  }
}

export interface IMatchModel {
  getAll(inProgress: boolean | undefined): Promise<returnedMatch[]>
  create(data: Omit<Match, 'id' | 'inProgress'>): Promise<Match>
  update(id: number): Promise<void>
}

export interface IMatchService {
  getAll(query: boolean | undefined): Promise<returnedMatch[]>
  create(data: Omit<Match, 'id' | 'inProgress'>): Promise<Match>
  update(id: number): Promise<void>
}
