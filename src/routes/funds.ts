/**
 * @openapi
 * /funds:
 *   get:
 *     summary: Get all funds
 *     tags: [Funds]
 *     responses:
 *       200:
 *         description: List of all funds
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Fund'
 *   post:
 *     summary: Create a new fund
 *     tags: [Funds]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FundInput'
 *     responses:
 *       201:
 *         description: Fund created successfully
 *
 * /funds/{id}:
 *   get:
 *     summary: Get a specific fund by ID
 *     tags: [Funds]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Fund details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Fund'
 */

import { Router } from 'express';
import * as fundController from '../controllers/fundController';
import investmentsRouter from './investments';

const router = Router();

router.get('/', fundController.getFunds);
router.post('/', fundController.createFund);
router.get('/:id', fundController.getFundById);
router.use('/:fund_id/investments', investmentsRouter);
router.get('/:id/total-value', fundController.getFundTotalValue);

export default router;
