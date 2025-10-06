import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const recalculateFees = async (req: Request, res: Response) => {
    const { fund_id, new_fee_percentage, apply_retroactively } = req.body;

    try {
        const fund = await prisma.fund.findUnique({ where: { id: fund_id } });
        if (!fund) return res.status(404).json({ error: 'Fund not found' });

        const transactions = await prisma.transaction.findMany({
            where: { fund_id },
        });

        let updatedCount = 0;
        let totalExtraFees = 0;

        for (const t of transactions) {
            if (t.status !== 'completed' || !t.amount) continue;

            const oldFees = Number(t.calculated_fees ?? 0);
            const newFees =
                (Number(t.amount) * Number(new_fee_percentage)) / 100;
            totalExtraFees += newFees - oldFees;

            if (apply_retroactively) {
                await prisma.transaction.update({
                    where: { transaction_id: t.transaction_id },
                    data: {
                        fee_percentage: new_fee_percentage,
                        calculated_fees: newFees,
                    },
                });
            }

            updatedCount++;
        }

        res.json({
            updated_transactions: updatedCount,
            total_additional_fees: totalExtraFees.toFixed(2),
        });
    } catch {
        res.status(400).json({ error: 'Error recalculating fees' });
    }
};
