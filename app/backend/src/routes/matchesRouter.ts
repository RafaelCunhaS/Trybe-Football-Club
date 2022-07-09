import { Router } from 'express';
import authToken from '../middlewares/authToken';
import matchesFactory from '../factories/matchesFactory';

const router = Router();

router.get('/', (req, res) => matchesFactory().getAll(req, res));

router.post('/', authToken, (req, res) => matchesFactory().create(req, res));

router.patch('/:id/finish', (req, res) => matchesFactory().updateFinished(req, res));

router.patch('/:id', (req, res) => matchesFactory().updateGoals(req, res));

export default router;
