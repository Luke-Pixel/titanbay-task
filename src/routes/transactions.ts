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
 * /transactions/{id}/reverse:
 *   put:
 *     summary: Reverse an existing transaction
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
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
import { validateBody } from '../middleware/validation';
import { TransactionSchema } from '../utils/validation';
import { z } from 'zod';

const TransactionReverseSchema = z.object({
    reason: z.string().min(1, 'Reversal reason is required'),
    refund_fees: z.boolean().optional().default(false),
});

const router = Router();

router.get('/', transactionController.getAllTransactions);
router.post(
    '/process',
    validateBody(TransactionSchema),
    transactionController.processTransaction,
);
router.put(
    '/:id/reverse',
    validateBody(TransactionReverseSchema),
    transactionController.reverseTransaction,
);

export default router;
