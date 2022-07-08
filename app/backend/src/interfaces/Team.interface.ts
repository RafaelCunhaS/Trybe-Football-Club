import Team from '../database/models/Team.model';

export interface ITeamModel {
  getAll(): Promise<Team[]>
  getById(id: number): Promise<Team | null>
}

export interface ITeamService {
  getAll(): Promise<Team[]>
  getById(id: number): Promise<Team | null>
}
