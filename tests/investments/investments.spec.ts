import request from 'supertest';
import app from '../../src/app';

let fundId: string;
let investorId: string;

beforeAll(async () => {
    const fund = await request(app).post('/funds').send({
        name: 'Investment Fund',
        vintage_year: 2022,
        target_size_usd: 5000000,
        status: 'Fundraising',
    });
    fundId = fund.body.id;

    const investorRes = await request(app).post('/investors').send({
        name: 'Alice Capital',
        investor_type: 'Institution',
        email: 'luke@capital.com',
    });

    investorId = investorRes.body.id;
});

describe('Investments API', () => {
    it('should create an investment', async () => {
        const res = await request(app)
            .post(`/funds/${fundId}/investments`)
            .send({
                investor_id: investorId,
                amount_usd: 250000,
                investment_date: '2025-10-06T15:32:10.436Z',
            });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('fund_id', fundId);
        //  investmentId = res.body.id
    });

    it('should list investments for a fund', async () => {
        const res = await request(app).get(`/funds/${fundId}/investments`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});
