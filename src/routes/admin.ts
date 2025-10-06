import { Router } from 'express';
import * as adminController from '../controllers/adminController';

const router = Router();
router.post('/recalculate-fees', adminController.recalculateFees);
export default router;
