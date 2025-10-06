import request from 'supertest';
import app from '../../src/app';

let investorId: string;

describe('Investors API', () => {
    it('should create an investor', async () => {
        const res = await request(app).post('/investors').send({
            name: 'Alice Capital',
            investor_type: 'Institution',
            email: 'alice@capital.com',
        });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
        investorId = res.body.id;
    });

    it('should list all investors', async () => {
        const res = await request(app).get('/investors');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});

export { investorId };
