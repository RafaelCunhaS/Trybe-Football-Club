import { Router } from 'express';
import leaderboardFactory from '../factories/leaderboardFactory';

const router = Router();

router.get('/home', (req, res) => leaderboardFactory().getHomeLeaderboard(req, res));

export default router;
