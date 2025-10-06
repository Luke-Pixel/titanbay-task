import request from 'supertest';
import app from '../../src/app';

describe('Admin API - Validation', () => {
    it('should reject missing required fields', async () => {
        const res = await request(app)
            .post('/admin/recalculate-fees')
            .send({})
            .expect(400);

        expect(res.body.error).toEqual('Error recalculating fees');
    });

    it('should reject invalid data types', async () => {
        await request(app)
            .post('/admin/recalculate-fees')
            .send({
                fund_id: 'invalid',
                new_fee_percentage: 'high',
                apply_retroactively: 'yes',
            })
            .expect(404);
    });

    it('should reject nonexistent fund ID', async () => {
        const res = await request(app)
            .post('/admin/recalculate-fees')
            .send({
                fund_id: 99999,
                new_fee_percentage: 3,
                apply_retroactively: true,
            })
            .expect(400);
    });
});
