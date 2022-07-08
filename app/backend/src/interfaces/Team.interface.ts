import Team from '../database/models/Team.model';

export interface ITeamModel {
  getAll(): Promise<Team[]>
}

export interface ITeamService {
  getAll(): Promise<Team[]>
}
