import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fundRoutes from './routes/funds';
import investorRoutes from './routes/investors';
import transactionRoutes from './routes/transactions';
import adminRoutes from './routes/admin';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use('/funds', fundRoutes);
app.use('/investors', investorRoutes);
app.use('/transactions', transactionRoutes);
app.use('/admin', adminRoutes);
app.use(errorHandler);

export default app;
