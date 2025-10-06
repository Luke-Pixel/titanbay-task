import { Request, Response } from 'express';
import prisma from '../utils/prisma';
import { InvestorSchema } from '../utils/validation';
import { z } from 'zod';

export const getInvestors = async (_req: Request, res: Response) => {
    const investors = await prisma.investor.findMany();
    res.json(investors);
};

export const createInvestor = async (req: Request, res: Response) => {
    try {
        const parsed = InvestorSchema.parse(req.body);

        const investor = await prisma.investor.create({ data: parsed });
        res.status(201).json(investor);
    } catch (err) {
        if (err instanceof z.ZodError)
            return res.status(400).json({ error: err.issues });

        res.status(500).json({ error: 'Unexpected server error' });
    }
};
