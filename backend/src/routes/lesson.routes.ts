import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import {
  getLessons,
  getLesson,
  completeLesson,
} from '../controllers/lesson.controller.js';

const router = Router();

router.get('/', getLessons);
router.get('/:slug', getLesson);
router.post('/:id/complete', authenticate, completeLesson);

export default router;
