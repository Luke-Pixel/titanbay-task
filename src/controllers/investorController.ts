import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const getInvestors = async (_req: Request, res: Response) => {
    try {
        const investors = await prisma.investor.findMany();
        res.json(investors);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch investors' });
    }
};

export const createInvestor = async (req: Request, res: Response) => {
    try {
        const investor = await prisma.investor.create({ data: req.body });
        res.status(201).json(investor);
    } catch (err: any) {
        if (err.code === 'P2002') {
            return res.status(409).json({ error: 'Email already exists' });
        }

        res.status(500).json({ error: 'Failed to create investor' });
    }
};
