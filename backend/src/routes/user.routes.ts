import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { getProfile, updateProfile, getProgress } from '../controllers/user.controller.js';

const router = Router();

router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, updateProfile);
router.get('/progress', authenticate, getProgress);

export default router;
