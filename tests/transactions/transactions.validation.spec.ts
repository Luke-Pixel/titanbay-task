import request from 'supertest';
import app from '../../src/app';

describe('Transactions API - Validation', () => {
    it('should reject missing required fields', async () => {
        const res = await request(app)
            .post('/transactions/process')
            .send({})
            .expect(400);
        expect(res.body.error).toBeDefined();
    });

    it('should reject invalid numeric fields', async () => {
        const res = await request(app)
            .post('/transactions/process')
            .send({
                fund_id: 'abc',
                amount: 'NaN',
                fee_percentage: 'three',
                status: 'completed',
            })
            .expect(400);

        expect(res.body.error).toEqual('Validation failed');
        expect(res.body.details).toEqual([
            {
                code: 'invalid_format',
                format: 'uuid',
                message: 'Invalid UUID',
                origin: 'string',
                path: ['fund_id'],
                pattern:
                    '/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/',
            },
            {
                code: 'invalid_type',
                expected: 'number',
                message: 'Invalid input: expected number, received string',
                path: ['amount'],
            },
            {
                code: 'invalid_type',
                expected: 'number',
                message: 'Invalid input: expected number, received string',
                path: ['fee_percentage'],
            },
        ]);
    });

    it('should reject reverse for nonexistent transaction', async () => {
        const res = await request(app)
            .put('/transactions/99999/reverse')
            .send({
                reason: 'Testing invalid transaction',
                refund_fees: true,
            })
            .expect(404);

        expect(res.body.error).toEqual('Transaction not found');
    });
});
