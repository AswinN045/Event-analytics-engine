import { Router } from 'express';
import validate from '../middleware/validate.js';
import { eventCollections, eventSummary, userStats } from '../validations/analytics.validations.js';
import { validateApiKey } from '../middleware/auth.middleware.js';
import { createCollections, getEventSummary, getUserStats } from '../controllers/analytics.controller.js'


const router = Router();

router.post('/collect', validateApiKey, validate(eventCollections), createCollections);
router.get('/event-summary', validateApiKey, validate(eventSummary), getEventSummary);
router.get('/user-stats', validateApiKey, validate(userStats), getUserStats);

export default router;
