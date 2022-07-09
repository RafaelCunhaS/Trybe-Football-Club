import { Router } from 'express';
import matchesFactory from '../factories/matchesFactory';

const router = Router();

router.get('/', (req, res) => matchesFactory().getAll(req, res));

router.post('/', (req, res) => matchesFactory().create(req, res));

export default router;
