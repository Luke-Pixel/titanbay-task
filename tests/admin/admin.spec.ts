import request from 'supertest';
import app from '../../src/app';

let fundId: string;

beforeAll(async () => {
    const fund = await request(app).post('/funds').send({
        name: 'Admin Fund',
        vintage_year: 2023,
        target_size_usd: 8000000,
        status: 'Investing',
    });
    fundId = fund.body.id;
});

describe('Admin API', () => {
    it('should recalculate fees', async () => {
        const res = await request(app).post('/admin/recalculate-fees').send({
            fund_id: fundId,
            new_fee_percentage: 3.0,
            apply_retroactively: true,
        });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('updated_transactions');
    });
});
