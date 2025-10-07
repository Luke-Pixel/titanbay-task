/**
 * @openapi
 * /admin/recalculate-fees:
 *   post:
 *     summary: Recalculate transaction fees for a fund
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdminFeeInput'
 *     responses:
 *       200:
 *         description: Fee recalculation complete
 */

import { Router } from 'express';
import * as adminController from '../controllers/adminController';
import { validateBody } from '../middleware/validation';
import { AdminFeeSchema } from '../utils/validation';

const router = Router();
router.post(
    '/recalculate-fees',
    validateBody(AdminFeeSchema),
    adminController.recalculateFees,
);
export default router;
