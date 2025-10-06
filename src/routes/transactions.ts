/**
 * @openapi
 * /transactions/process:
 *   post:
 *     summary: Process a new transaction
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TransactionInput'
 *     responses:
 *       201:
 *         description: Transaction processed successfully
 *
 * /transactions/{transactionId}/reverse:
 *   put:
 *     summary: Reverse an existing transaction
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: transactionId
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TransactionReverseInput'
 *     responses:
 *       200:
 *         description: Transaction reversed successfully
 */

import { Router } from 'express';
import * as transactionController from '../controllers/transactionController';

const router = Router();

router.get('/', transactionController.getAllTransactions);
router.post('/process', transactionController.processTransaction);
router.put('/:id/reverse', transactionController.reverseTransaction);

export default router;
