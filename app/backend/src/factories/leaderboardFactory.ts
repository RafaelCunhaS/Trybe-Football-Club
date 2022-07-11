import LeaderboardController from '../controller/Leaderboard.controller';
import LeaderboardRepository from '../repository/LeaderboardRepository';
import LeaderboardService from '../service/Leaderboard.service';

export default () => {
  const model = new LeaderboardRepository();
  const service = new LeaderboardService(model);
  const controller = new LeaderboardController(service);

  return controller;
};
