import request from 'supertest';
import app from '../../src/app';

describe('Funds API - Validation', () => {
    it('should reject creation with missing required fields', async () => {
        const res = await request(app)
            .post('/funds')
            .send({
                status: 'Fundraising',
            })
            .expect(400);

        expect(res.body.error).toEqual([
            {
                code: 'invalid_type',
                expected: 'string',
                message: 'Invalid input: expected string, received undefined',
                path: ['name'],
            },
            {
                code: 'invalid_type',
                expected: 'number',
                message: 'Invalid input: expected number, received undefined',
                path: ['vintage_year'],
            },
            {
                code: 'invalid_type',
                expected: 'number',
                message: 'Invalid input: expected number, received undefined',
                path: ['target_size_usd'],
            },
        ]);
    });

    it('should reject invalid data types', async () => {
        const res = await request(app)
            .post('/funds')
            .send({
                name: 123, // invalid type
                vintage_year: '2020', // string instead of number
                target_size_usd: 'ten million',
                status: 'Fundraising',
            })
            .expect(400);

        expect(res.body.error).toEqual([
            {
                code: 'invalid_type',
                expected: 'string',
                message: 'Invalid input: expected string, received number',
                path: ['name'],
            },
            {
                code: 'invalid_type',
                expected: 'number',
                message: 'Invalid input: expected number, received string',
                path: ['vintage_year'],
            },
            {
                code: 'invalid_type',
                expected: 'number',
                message: 'Invalid input: expected number, received string',
                path: ['target_size_usd'],
            },
        ]);
    });

    it('should return 404 for non-existent fund', async () => {
        const res = await request(app).get('/funds/99999').expect(404);
        expect(res.body.error).toEqual('Fund not found');
    });
});
