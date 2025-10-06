import { Router } from 'express';
import * as transactionController from '../controllers/transactionController';

const router = Router();

router.get('/', transactionController.getAllTransactions);
router.post('/process', transactionController.processTransaction);
router.put('/:id/reverse', transactionController.reverseTransaction);

export default router;
