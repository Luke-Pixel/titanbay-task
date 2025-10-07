import { Request, Response } from 'express';
import prisma from '../utils/prisma';
import { InvestmentSchema } from '../utils/validation';
import { z } from 'zod';
import investments from '../routes/investments';

export const getInvestmentsByFund = async (req: Request, res: Response) => {
    const { fund_id } = req.params;
    try {
        const investments = await prisma.investment.findMany({
            where: { fund_id },
            include: { investor: true },
        });
        res.json(investments);
    } catch {
        if (investments == null) {
            res.status(404).json({ error: 'Invalid fund ID' });
        }

        res.status(500).json({ error: 'Unexpected server error' });
    }
};

export const createInvestment = async (req: Request, res: Response) => {
    const { fund_id } = req.params;

    try {
        const parsed = InvestmentSchema.parse(req.body);
        const fund = await prisma.fund.findUnique({ where: { id: fund_id } });
        const investor = await prisma.investor.findUnique({
            where: { id: parsed.investor_id },
        });

        if (!fund || !investor)
            return res
                .status(404)
                .json({ error: 'Fund or investor not found' });

        const investment = await prisma.investment.create({
            data: { ...parsed, fund_id },
        });

        res.status(201).json(investment);
    } catch (err) {
        if (err instanceof z.ZodError)
            return res.status(400).json({ error: err.issues });

        res.status(500).json({ error: 'Unexpected server error' });
    }
};
