import { z } from 'zod';

// ---- FUND ----
export const FundSchema = z.object({
    name: z.string().min(2, 'Fund name too short'),
    vintage_year: z.number().int().gte(1900).lte(new Date().getFullYear()),
    target_size_usd: z.number().positive('Target size must be positive'),
    status: z.enum(['Fundraising', 'Investing', 'Closed']),
});

// ---- INVESTOR ----
export const InvestorSchema = z.object({
    name: z.string().min(2),
    investor_type: z.enum(['Individual', 'Institution', 'Family Office']),
    email: z.string().email(),
});

// ---- INVESTMENT ----
export const InvestmentSchema = z.object({
    investor_id: z.string().uuid(),
    amount_usd: z.number().positive(),
    investment_date: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format',
    }),
});

// ---- TRANSACTION ----
export const TransactionSchema = z.object({
    fund_id: z.string().uuid(),
    amount: z.number().positive(),
    fee_percentage: z.number().nonnegative(),
    auto_calculate_fees: z.boolean().optional().default(false),
    bypass_validation: z.boolean().optional().default(false),
    status: z.enum(['completed', 'pending', 'reversed']),
});
