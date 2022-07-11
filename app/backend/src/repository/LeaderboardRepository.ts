import { ITeamWithMatches } from '../interfaces/Team.interface';
import { generalLeaderboard, matchesData, sortLeaderboard } from '../helpers/leaderboardsHelper';
import Match from '../database/models/Match.model';
import Team from '../database/models/Team.model';
import { ILeaderboard, ILeaderboardModel } from '../interfaces/Leaderboard.interface';

export default class LeaderboardRepository implements ILeaderboardModel {
  constructor(private _teamModel = Team) {}

  async getHomeLeaderboard(): Promise<ILeaderboard[]> {
    const teamsAndMatches = await this._teamModel.findAll({
      include: [
        { model: Match, as: 'teamHome', where: { inProgress: false } },
      ],
    }) as unknown as ITeamWithMatches[];

    const leaderboard = teamsAndMatches.map(({ teamName, teamHome }) => ({
      name: teamName,
      ...matchesData(teamHome, true),
    }));

    return sortLeaderboard(leaderboard);
  }

  async getAwayLeaderboard(): Promise<ILeaderboard[]> {
    const teamsAndMatches = await this._teamModel.findAll({
      include: [
        { model: Match, as: 'teamAway', where: { inProgress: false } },
      ],
    }) as unknown as ITeamWithMatches[];

    const leaderboard = teamsAndMatches.map(({ teamName, teamAway }) => ({
      name: teamName,
      ...matchesData(teamAway, false),
    }));

    return sortLeaderboard(leaderboard);
  }

  async getAll(): Promise<ILeaderboard[]> {
    const teamsAndMatches = await this._teamModel.findAll({
      include: [
        { model: Match, as: 'teamHome', where: { inProgress: false } },
        { model: Match, as: 'teamAway', where: { inProgress: false } },
      ],
    }) as unknown as ITeamWithMatches[];

    const leaderboard = teamsAndMatches.map(({ teamName, teamHome, teamAway }) => ({
      name: teamName,
      ...generalLeaderboard(matchesData(teamHome, true), matchesData(teamAway, false)),
    }));

    return sortLeaderboard(leaderboard);
  }
}
