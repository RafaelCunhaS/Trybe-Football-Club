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
  getAll(query: string): Promise<returnedMatch[]>
}

export interface IMatchService {
  getAll(query: string): Promise<returnedMatch[]>
}
