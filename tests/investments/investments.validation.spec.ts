import request from 'supertest';
import app from '../../src/app';

describe('Investments API - Validation', () => {
    let fundId: number;

    beforeAll(async () => {
        const fundRes = await request(app).post('/funds').send({
            name: 'Validation Fund',
            vintage_year: 2023,
            target_size_usd: 10000000,
            status: 'Fundraising',
        });
        fundId = fundRes.body.id;
    });

    it('should reject investment with missing fields', async () => {
        const res = await request(app)
            .post(`/funds/${fundId}/investments`)
            .send({})
            .expect(400);

        expect(res.body.error).toEqual([
            {
                code: 'invalid_type',
                expected: 'string',
                message: 'Invalid input: expected string, received undefined',
                path: ['investor_id'],
            },
            {
                code: 'invalid_type',
                expected: 'number',
                message: 'Invalid input: expected number, received undefined',
                path: ['amount_usd'],
            },
            {
                code: 'invalid_type',
                expected: 'string',
                message: 'Invalid input: expected string, received undefined',
                path: ['investment_date'],
            },
        ]);
    });

    it('should reject invalid amount type', async () => {
        const res = await request(app)
            .post(`/funds/${fundId}/investments`)
            .send({
                investor_id: 1,
                amount_usd: 'invalid',
                investment_date: '2024-01-15',
            })
            .expect(400);

        expect(res.body.error).toEqual([
            {
                code: 'invalid_type',
                expected: 'string',
                message: 'Invalid input: expected string, received number',
                path: ['investor_id'],
            },
            {
                code: 'invalid_type',
                expected: 'number',
                message: 'Invalid input: expected number, received string',
                path: ['amount_usd'],
            },
        ]);
    });

    it('should reject investments for nonexistent fund', async () => {
        await request(app)
            .post(`/funds/99999/investments`)
            .send({
                investor_id: 1,
                amount_usd: 500000,
                investment_date: '2024-01-15',
            })
            .expect(400);
    });
});
