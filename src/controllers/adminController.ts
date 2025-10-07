import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const recalculateFees = async (req: Request, res: Response) => {
    try {
        const { fund_id, new_fee_percentage, apply_retroactively } = req.body;

        const fund = await prisma.fund.findUnique({ where: { id: fund_id } });
        if (!fund) {
            return res.status(404).json({ error: 'Fund not found' });
        }

        const transactions = await prisma.transaction.findMany({
            where: {
                fund_id,
                status: 'completed',
            },
        });

        let updatedCount = 0;
        let totalExtraFees = 0;

        if (apply_retroactively) {
            const updatePromises = transactions.map(async (t) => {
                if (!t.amount) return;

                const oldFees = Number(t.calculated_fees ?? 0);
                const newFees =
                    (Number(t.amount) * Number(new_fee_percentage)) / 100;
                totalExtraFees += newFees - oldFees;

                return prisma.transaction.update({
                    where: { transaction_id: t.transaction_id },
                    data: {
                        fee_percentage: new_fee_percentage,
                        calculated_fees: newFees,
                    },
                });
            });

            await Promise.all(updatePromises);
            updatedCount = transactions.length;
        } else {
            transactions.forEach((t) => {
                if (!t.amount) return;
                const oldFees = Number(t.calculated_fees ?? 0);
                const newFees =
                    (Number(t.amount) * Number(new_fee_percentage)) / 100;
                totalExtraFees += newFees - oldFees;
                updatedCount++;
            });
        }

        res.json({
            updated_transactions: updatedCount,
            total_additional_fees: Number(totalExtraFees.toFixed(2)),
            fund_id,
            new_fee_percentage,
            apply_retroactively,
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to recalculate fees' });
    }
};
