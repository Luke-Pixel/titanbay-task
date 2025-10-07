import request from 'supertest';
import app from '../../src/app';

describe('Investors API - Validation', () => {
    it('should reject missing required fields', async () => {
        const res = await request(app).post('/investors').send({}).expect(400);

        expect(res.body.error).toEqual('Validation failed');
        expect(res.body.details).toEqual([
            {
                code: 'invalid_type',
                expected: 'string',
                message: 'Invalid input: expected string, received undefined',
                path: ['name'],
            },
            {
                code: 'invalid_value',
                message:
                    'Invalid option: expected one of "Individual"|"Institution"|"Family Office"',
                path: ['investor_type'],
                values: ['Individual', 'Institution', 'Family Office'],
            },
            {
                code: 'invalid_type',
                expected: 'string',
                message: 'Invalid input: expected string, received undefined',
                path: ['email'],
            },
        ]);
    });

    it('should reject invalid email format', async () => {
        const res = await request(app)
            .post('/investors')
            .send({
                name: 'Invalid Email Investor',
                investor_type: 'Institution',
                email: 'not-an-email',
            })
            .expect(400);

        expect(res.body.error).toEqual('Validation failed');
        expect(res.body.details).toEqual([
            {
                code: 'invalid_format',
                format: 'email',
                message: 'Invalid email address',
                origin: 'string',
                path: ['email'],
                pattern:
                    "/^(?!\\.)(?!.*\\.\\.)([A-Za-z0-9_'+\\-\\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\\-]*\\.)+[A-Za-z]{2,}$/",
            },
        ]);
    });

    it('should reject duplicate email', async () => {
        const validInvestor = {
            name: 'Alice Capital',
            investor_type: 'Institution',
            email: `alice-${Date.now()}@capital.com`,
        };

        await request(app).post('/investors').send(validInvestor).expect(201);

        const res = await request(app)
            .post('/investors')
            .send(validInvestor)
            .expect(500);

        expect(res.body.error).toEqual('Unexpected server error');
    });
});
