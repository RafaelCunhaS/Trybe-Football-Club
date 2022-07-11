import { ILeaderboard } from '../interfaces/Leaderboard.interface';

export type TMatchesResultsWithTotals = Omit<ILeaderboard, 'name'>;

export type TMatchesResults = Omit<TMatchesResultsWithTotals,
'totalPoints' | 'totalGames' | 'goalsBalance' | 'efficiency'>;
