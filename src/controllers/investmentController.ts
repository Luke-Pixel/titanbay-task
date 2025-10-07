import { Request, Response } from 'express';
import prisma from '../utils/prisma';
import { InvestmentSchema } from '../utils/validation';
import { z } from 'zod';
import investments from '../routes/investments';

export const getInvestmentsByFund = async (req: Request, res: Response) => {
    const { fund_id } = req.params;

    try {
        const fund = await prisma.fund.findUnique({ where: { id: fund_id } });
        if (!fund) {
            return res.status(404).json({ error: 'Fund not found' });
        }

        const investments = await prisma.investment.findMany({
            where: { fund_id },
            include: { investor: true },
        });
        res.json(investments);
    } catch {
        res.status(500).json({ error: 'Failed to fetch investments' });
    }
};

export const createInvestment = async (req: Request, res: Response) => {
    const { fund_id } = req.params;

    try {
        const { investor_id, amount_usd, investment_date } = req.body;

        const [fund, investor] = await Promise.all([
            prisma.fund.findUnique({ where: { id: fund_id } }),
            prisma.investor.findUnique({ where: { id: investor_id } }),
        ]);

        if (!fund) {
            return res.status(404).json({ error: 'Fund not found' });
        }
        if (!investor) {
            return res.status(404).json({ error: 'Investor not found' });
        }

        const investment = await prisma.investment.create({
            data: {
                investor_id,
                fund_id,
                amount_usd,
                investment_date: new Date(investment_date),
            },
        });

        res.status(201).json(investment);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create investment' });
    }
};
