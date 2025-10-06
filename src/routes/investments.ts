import { Router } from 'express';
import * as investmentController from '../controllers/investmentController';

const router = Router({ mergeParams: true });

router.get('/', investmentController.getInvestmentsByFund);
router.post('/', investmentController.createInvestment);

export default router;
