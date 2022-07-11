import matchesResults from '../helpers/matchesResults';
import Match from '../database/models/Match.model';
import Team from '../database/models/Team.model';
import { ILeaderboard, ILeaderboardModel } from '../interfaces/Leaderboard.interface';
// import { ITeamWithMatches } from '../interfaces/Team.interface';

export default class LeaderboardRepository implements ILeaderboardModel {
  constructor(private _teamModel = Team) {}

  async getHomeLeaderboard(): Promise<ILeaderboard[]> {
    const teamsAndMatches = await this._teamModel.findAll({
      include: [
        { model: Match, as: 'teamHome', where: { inProgress: false } },
      ],
    });

    const leaderboard = teamsAndMatches.map(({ teamName, teamHome }) => ({
      name: teamName,
      ...matchesResults(teamHome, true),
    }));

    return leaderboard.sort((a, b) => {
      let result = b.totalPoints - a.totalPoints;
      if (result === 0) result = b.totalVictories - a.totalVictories;
      if (result === 0) result = b.goalsBalance - a.goalsBalance;
      if (result === 0) result = b.goalsFavor - a.goalsFavor;
      if (result === 0) result = b.goalsOwn - a.goalsOwn;
      return result;
    });
  }

  // async getAll(): Promise<ILeaderboard[]> {
  //   const teamsAndMatches = await this._teamModel.findAll({
  //     include: [
  //       { model: Match, as: 'teamHome', where: { inProgress: false } },
  //       { model: Match, as: 'teamAway', where: { inProgress: false } },
  //     ],
  //   });

  //   return teamsAndMatches.map(({ teamName, teamHome, teamAway }) => ({
  //     name: teamName,
  //     ...matchesResults(teamHome, teamAway),

  //   }))
  // }
}
