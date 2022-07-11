import Match from '../database/models/Match.model';
import Team from '../database/models/Team.model';

export interface ITeamWithMatches extends Team {
  teamHome: Match[]
  teamAway: Match[]
}

export interface ITeamModel {
  getAll(): Promise<Team[]>
  getById(id: number): Promise<Team | null>
}

export interface ITeamService {
  getAll(): Promise<Team[]>
  getById(id: number): Promise<Team | null>
}
