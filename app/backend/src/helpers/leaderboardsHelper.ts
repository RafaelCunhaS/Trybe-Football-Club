import { TTeamData, TMatchesResults } from '../types/leaderboards.type';
import { IMatchWithTeam } from '../interfaces/Match.interface';
import { ILeaderboard } from '../interfaces/Leaderboard.interface';

const checkResults = (acc: TMatchesResults, teamGoals: number, opponentGoals: number) => {
  if (teamGoals > opponentGoals) acc.totalVictories += 1;
  else if (teamGoals < opponentGoals) acc.totalLosses += 1;
  else acc.totalDraws += 1;

  acc.goalsFavor += teamGoals;
  acc.goalsOwn += opponentGoals;
  return acc;
};

const getMatchesData = (teamMatches: IMatchWithTeam[], home: boolean) => {
  if (home) {
    return teamMatches.reduce((acc, { homeTeamGoals, awayTeamGoals }) => (
      checkResults(acc, homeTeamGoals, awayTeamGoals)
    ), { totalVictories: 0, totalDraws: 0, totalLosses: 0, goalsFavor: 0, goalsOwn: 0 });
  }

  return teamMatches.reduce((acc, { awayTeamGoals, homeTeamGoals }) => (
    checkResults(acc, awayTeamGoals, homeTeamGoals)
  ), { totalVictories: 0, totalDraws: 0, totalLosses: 0, goalsFavor: 0, goalsOwn: 0 });
};

export const matchesData = (teamMatches: IMatchWithTeam[], homeMatches: boolean): TTeamData => {
  const matches = getMatchesData(teamMatches, homeMatches);
  const totalGames = teamMatches.length;
  const totalPoints = (matches.totalVictories * 3) + matches.totalDraws;

  return ({
    totalPoints,
    totalGames,
    ...matches,
    goalsBalance: matches.goalsFavor - matches.goalsOwn,
    efficiency: Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2)),
  });
};

export const generalLeaderboard = (homeData: TTeamData, awayData: TTeamData): TTeamData => {
  const homeValues = Object.entries(homeData);
  const awayValues = Object.entries(awayData);
  const finalValues = homeValues.map((entrie, index) => {
    const value = entrie[1] + awayValues[index][1];
    return [entrie[0], value];
  });
  const result = Object.fromEntries(finalValues) as TTeamData;

  return ({
    ...result,
    goalsBalance: result.goalsFavor - result.goalsOwn,
    efficiency: Number(((result.totalPoints / (result.totalGames * 3)) * 100).toFixed(2)),
  });
};

export const sortLeaderboard = (leaderboard: ILeaderboard[]): ILeaderboard[] => {
  leaderboard.sort((a, b) => b.totalPoints - a.totalPoints
  || b.totalVictories - a.totalVictories
  || b.goalsBalance - a.goalsBalance
  || b.goalsFavor - a.goalsFavor
  || b.goalsOwn - a.goalsOwn);

  return leaderboard;
};
