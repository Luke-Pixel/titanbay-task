import request from 'supertest';
import app from '../../src/app';

let fundId: string;
let transactionId: string;

beforeAll(async () => {
    const fund = await request(app).post('/funds').send({
        name: 'Transaction Fund',
        vintage_year: 2023,
        target_size_usd: 10000000,
        status: 'Investing',
    });
    fundId = fund.body.id;
});

describe('Transactions API', () => {
    it('should process a transaction', async () => {
        const res = await request(app).post('/transactions/process').send({
            fund_id: fundId,
            amount: 50000,
            fee_percentage: 2.5,
            auto_calculate_fees: true,
            bypass_validation: false,
            status: 'completed',
        });

        expect(res.status).toBe(201);
        transactionId = res.body.transaction_id;
    });

    it('should reverse a transaction', async () => {
        const res = await request(app)
            .put(`/transactions/${transactionId}/reverse`)
            .send({
                reason: 'Investor refund test',
                refund_fees: true,
            });

        expect(res.status).toBe(200);
        expect(res.body.status).toBe('reversed');
    });
});
