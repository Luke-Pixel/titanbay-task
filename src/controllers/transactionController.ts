import { Request, Response } from 'express';
import prisma from '../utils/prisma';
import { TransactionSchema } from '../utils/validation';
import { z } from 'zod';

export const getAllTransactions = async (_req: Request, res: Response) => {
    const transactions = await prisma.transaction.findMany();
    res.json(transactions);
};

export const processTransaction = async (req: Request, res: Response) => {
    try {
        const parsed = TransactionSchema.parse(req.body);

        const fund = await prisma.fund.findUnique({
            where: { id: parsed.fund_id },
        });
        if (!fund) return res.status(404).json({ error: 'Fund not found' });

        const calculated_fees = parsed.auto_calculate_fees
            ? (Number(parsed.amount) * Number(parsed.fee_percentage)) / 100
            : null;

        const transaction = await prisma.transaction.create({
            data: { ...parsed, calculated_fees },
        });

        res.status(201).json(transaction);
    } catch (err) {
        if (err instanceof z.ZodError)
            return res.status(400).json({ error: err.issues });
        res.status(500).json({ error: 'Unexpected server error' });
    }
};

export const reverseTransaction = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { reason, refund_fees } = req.body;

    try {
        const existing = await prisma.transaction.findUnique({
            where: { transaction_id: id },
        });

        if (!existing)
            return res.status(404).json({ error: 'Transaction not found' });
        if (existing.status !== 'completed')
            return res
                .status(400)
                .json({ error: 'Only completed transactions can be reversed' });

        const reversed = await prisma.transaction.update({
            where: { transaction_id: id },
            data: {
                status: 'reversed',
                reversed_at: new Date(),
                reversal_reason: reason,
                calculated_fees: refund_fees ? 0 : existing.calculated_fees,
            },
        });

        res.json(reversed);
    } catch {
        res.status(400).json({ error: 'Error reversing transaction' });
    }
};
