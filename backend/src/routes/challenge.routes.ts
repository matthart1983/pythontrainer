import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import {
  getChallenges,
  getChallenge,
  submitChallenge,
} from '../controllers/challenge.controller.js';

const router = Router();

router.get('/', getChallenges);
router.get('/:slug', getChallenge);
router.post('/:id/submit', authenticate, submitChallenge);

export default router;
