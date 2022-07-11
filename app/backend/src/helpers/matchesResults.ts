import { TMatchesResultsWithTotals, TMatchesResults } from '../types/matchesResults.type';
import { IMatchWithTeam } from '../interfaces/Match.interface';

const checkResults = (acc: TMatchesResults, teamGoals: number, opponentsGoals: number) => {
  if (teamGoals > opponentsGoals) acc.totalVictories += 1;

  else if (teamGoals < opponentsGoals) acc.totalLosses += 1;

  else acc.totalDraws += 1;

  acc.goalsFavor += teamGoals;
  acc.goalsOwn += opponentsGoals;
  return acc;
};

const getMatches = (teamMatches: IMatchWithTeam[], home: boolean) => {
  if (home) {
    return teamMatches.reduce((acc, { homeTeamGoals, awayTeamGoals }) => (
      checkResults(acc, homeTeamGoals, awayTeamGoals)
    ), { totalVictories: 0, totalDraws: 0, totalLosses: 0, goalsFavor: 0, goalsOwn: 0 });
  }
  return teamMatches.reduce((acc, { awayTeamGoals, homeTeamGoals }) => (
    checkResults(acc, awayTeamGoals, homeTeamGoals)
  ), { totalVictories: 0, totalDraws: 0, totalLosses: 0, goalsFavor: 0, goalsOwn: 0 });
};

export default (teamMatches: IMatchWithTeam[], home: boolean): TMatchesResultsWithTotals => {
  const matches = getMatches(teamMatches, home);
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
