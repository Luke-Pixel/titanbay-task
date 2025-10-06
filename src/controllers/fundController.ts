import { Request, Response } from 'express';
import prisma from '../utils/prisma';
import { FundSchema } from '../utils/validation';
import { z } from 'zod';

export const getFunds = async (_req: Request, res: Response) => {
    const funds = await prisma.fund.findMany();
    res.json(funds);
};

export const getFundById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const fund = await prisma.fund.findUnique({ where: { id } });
    if (!fund) return res.status(404).json({ error: 'Fund not found' });
    res.json(fund);
};

export const createFund = async (req: Request, res: Response) => {
    try {
        const parsed = FundSchema.parse(req.body);

        const fund = await prisma.fund.create({ data: parsed });
        res.status(201).json(fund);
    } catch (err) {
        if (err instanceof z.ZodError) {
            return res.status(400).json({ error: err.issues });
        }
        res.status(500).json({ error: 'Unexpected server error' });
    }
};

export const getFundTotalValue = async (req: Request, res: Response) => {
    const { id } = req.params;
    const includePending = req.query.include_pending === 'true';

    try {
        const transactions = await prisma.transaction.findMany({
            where: {
                fund_id: id,
                OR: includePending
                    ? [{ status: 'completed' }, { status: 'pending' }]
                    : [{ status: 'completed' }],
            },
        });

        if (!transactions.length)
            return res.json({ total_value: 0, transaction_count: 0 });

        const totalValue = transactions.reduce((acc, t) => {
            const fees = Number(t.calculated_fees ?? 0);
            return acc + Number(t.amount) - fees;
        }, 0);

        const pendingValue = transactions
            .filter((t) => t.status === 'pending')
            .reduce((acc, t) => acc + Number(t.amount), 0);

        res.json({
            total_value: totalValue,
            pending_value: pendingValue,
            transaction_count: transactions.length,
        });
    } catch {
        res.status(400).json({ error: 'Could not calculate total value' });
    }
};
