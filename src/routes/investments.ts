/**
 * @openapi
 * /funds/{fundId}/investments:
 *   get:
 *     summary: Get all investments for a fund
 *     tags: [Investments]
 *     parameters:
 *       - in: path
 *         name: fundId
 *         schema:
 *           type: integer
 *         required: true
 *   post:
 *     summary: Create a new investment in a fund
 *     tags: [Investments]
 *     parameters:
 *       - in: path
 *         name: fundId
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InvestmentInput'
 *     responses:
 *       201:
 *         description: Investment created successfully
 */

import { Router } from 'express';
import * as investmentController from '../controllers/investmentController';

const router = Router({ mergeParams: true });

router.get('/', investmentController.getInvestmentsByFund);
router.post('/', investmentController.createInvestment);

export default router;
