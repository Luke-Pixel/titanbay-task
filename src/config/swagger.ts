import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJSDoc({
    definition: {
        openapi: '3.0.0',
        info: { title: 'Titanbay API', version: '1.0.0' },
        components: {
            schemas: {
                Fund: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        name: { type: 'string' },
                        vintage_year: { type: 'integer' },
                        target_size_usd: { type: 'number' },
                        status: { type: 'string' },
                    },
                },
                FundInput: {
                    type: 'object',
                    required: [
                        'name',
                        'vintage_year',
                        'target_size_usd',
                        'status',
                    ],
                    properties: {
                        name: { type: 'string' },
                        vintage_year: { type: 'integer' },
                        target_size_usd: { type: 'number' },
                        status: { type: 'string' },
                    },
                },
                InvestorInput: {
                    type: 'object',
                    required: ['name', 'investor_type', 'email'],
                    properties: {
                        name: { type: 'string' },
                        investor_type: { type: 'string' },
                        email: { type: 'string', format: 'email' },
                    },
                },
                InvestmentInput: {
                    type: 'object',
                    required: ['investor_id', 'amount_usd', 'investment_date'],
                    properties: {
                        investor_id: { type: 'integer' },
                        amount_usd: { type: 'number' },
                        investment_date: { type: 'string', format: 'date' },
                    },
                },
                TransactionInput: {
                    type: 'object',
                    required: ['fund_id', 'amount', 'fee_percentage', 'status'],
                    properties: {
                        fund_id: { type: 'integer' },
                        amount: { type: 'number' },
                        fee_percentage: { type: 'number' },
                        auto_calculate_fees: { type: 'boolean' },
                        bypass_validation: { type: 'boolean' },
                        status: { type: 'string' },
                    },
                },
                TransactionReverseInput: {
                    type: 'object',
                    required: ['reason'],
                    properties: {
                        reason: { type: 'string' },
                        refund_fees: { type: 'boolean' },
                    },
                },
                AdminFeeInput: {
                    type: 'object',
                    required: ['fund_id', 'new_fee_percentage'],
                    properties: {
                        fund_id: { type: 'integer' },
                        new_fee_percentage: { type: 'number' },
                        apply_retroactively: { type: 'boolean' },
                    },
                },
            },
        },
    },
    apis: ['./src/routes/*.ts'],
});
