/**
 * @openapi
 * /funds/{fund_id}/investments:
 *   get:
 *     summary: Get all investments for a fund
 *     tags: [Investments]
 *     parameters:
 *       - in: path
 *         name: fund_id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *   post:
 *     summary: Create a new investment in a fund
 *     tags: [Investments]
 *     parameters:
 *       - in: path
 *         name: fund_id
 *         schema:
 *           type: string
 *           format: uuid
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
import { validateBody } from '../middleware/validation';
import { InvestmentSchema } from '../utils/validation';

const router = Router({ mergeParams: true });

router.get('/', investmentController.getInvestmentsByFund);
router.post(
    '/',
    validateBody(InvestmentSchema),
    investmentController.createInvestment,
);

export default router;
