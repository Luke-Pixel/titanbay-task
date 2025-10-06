import request from 'supertest';
import app from '../../src/app';

let fundId: string;

describe('Funds API', () => {
    it('should create a fund', async () => {
        const res = await request(app).post('/funds').send({
            name: 'Growth Fund I',
            vintage_year: 2020,
            target_size_usd: 10000000,
            status: 'Fundraising',
        });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
        fundId = res.body.id;
    });

    it('should get all funds', async () => {
        const res = await request(app).get('/funds');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('should get a fund by ID', async () => {
        const res = await request(app).get(`/funds/${fundId}`);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('id', fundId);
    });

    it('should get total fund value', async () => {
        const res = await request(app).get(`/funds/${fundId}/total-value`);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('total_value');
    });
});
