import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fundRoutes from './routes/funds';
import investorRoutes from './routes/investors';
import transactionRoutes from './routes/transactions';
import adminRoutes from './routes/admin';
import { errorHandler } from './middleware/errorHandler';
import { swaggerSpec } from './config/swagger';
import swaggerUi from 'swagger-ui-express';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// routes
app.use('/funds', fundRoutes);
app.use('/investors', investorRoutes);
app.use('/transactions', transactionRoutes);
app.use('/admin', adminRoutes);

app.get('/', (req, res) => {
    res.json({
        message: 'Take Home Task',
        docs: 'Visit /api-docs for interactive documentation',
    });
});

app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
    });
});

app.use(errorHandler);

export default app;
