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

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: API for collecting and retrieving event analytics.
 */

/**
 * @swagger
 * /analytics/event-summary:
 *   get:
 *     summary: Get event summary data.
 *     description: Retrieve aggregated analytics data based on event type.
 *     tags: [Events]
 *     parameters:
 *       - in: query
 *         name: event
 *         schema:
 *           type: string
 *         required: true
 *         description: The event name (e.g., "click", "form_submit").
 *     responses:
 *       200:
 *         description: Event analytics summary
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 event:
 *                   type: string
 *                   example: "click"
 *                 count:
 *                   type: integer
 *                   example: 3400
 *                 uniqueUsers:
 *                   type: integer
 *                   example: 1200
 *                 deviceData:
 *                   type: object
 *                   properties:
 *                     mobile:
 *                       type: integer
 *                       example: 2200
 *                     desktop:
 *                       type: integer
 *                       example: 1200
 *       400:
 *         description: Bad request, missing or invalid parameters
 *       500:
 *         description: Internal server error
 */
