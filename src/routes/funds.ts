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
