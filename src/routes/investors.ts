import { Router } from 'express';
import * as investorController from '../controllers/investorController';

const router = Router();

router.get('/', investorController.getInvestors);
router.post('/', investorController.createInvestor);

export default router;
