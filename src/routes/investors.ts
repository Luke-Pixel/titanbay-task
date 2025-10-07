/**
 * @openapi
 * /investors:
 *   get:
 *     summary: Get all investors
 *     tags: [Investors]
 *     responses:
 *       200:
 *         description: List of all investors
 *   post:
 *     summary: Create a new investor
 *     tags: [Investors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InvestorInput'
 *     responses:
 *       201:
 *         description: Investor created successfully
 */

import { Router } from 'express';
import * as investorController from '../controllers/investorController';
import { validateBody } from '../middleware/validation';
import { InvestorSchema } from '../utils/validation';
const router = Router();

router.get('/', investorController.getInvestors);
router.post(
    '/',
    validateBody(InvestorSchema),
    investorController.createInvestor,
);

export default router;
