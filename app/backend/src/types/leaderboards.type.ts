import { ILeaderboard } from '../interfaces/Leaderboard.interface';

export type TTeamData = Omit<ILeaderboard, 'name'>;

export type TMatchesResults = Omit<TTeamData,
'totalPoints' | 'totalGames' | 'goalsBalance' | 'efficiency'>;
