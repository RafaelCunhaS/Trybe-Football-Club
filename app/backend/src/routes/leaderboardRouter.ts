import { Router } from 'express';
import leaderboardFactory from '../factories/leaderboardFactory';

const router = Router();

router.get('/', (req, res) => leaderboardFactory().getAll(req, res));

router.get('/home', (req, res) => leaderboardFactory().getHomeLeaderboard(req, res));

router.get('/away', (req, res) => leaderboardFactory().getAwayLeaderboard(req, res));

export default router;
