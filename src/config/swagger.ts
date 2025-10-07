import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJSDoc({
    definition: {
        openapi: '3.0.0',
        info: { title: 'Titanbay API', version: '1.0.0' },
        components: {
            schemas: {
                Transaction: {
                    type: 'object',
                    properties: {
                        transaction_id: { type: 'string', format: 'uuid' },
                        fund_id: { type: 'string', format: 'uuid' },
                        amount: {
                            oneOf: [
                                { type: 'number' },
                                { type: 'string', description: 'Decimal serialized as string' },
                            ],
                        },
                        fee_percentage: {
                            oneOf: [
                                { type: 'number' },
                                { type: 'string', description: 'Decimal serialized as string' },
                            ],
                        },
                        calculated_fees: {
                            oneOf: [
                                { type: 'number' },
                                { type: 'string', description: 'Decimal serialized as string' },
                                { type: 'null' },
                            ],
                        },
                        auto_calculate_fees: { type: 'boolean' },
                        bypass_validation: { type: 'boolean' },
                        status: { type: 'string', enum: ['completed', 'pending', 'reversed'] },
                        created_at: { type: 'string', format: 'date-time' },
                        reversed_at: { type: 'string', format: 'date-time', nullable: true },
                        reversal_reason: { type: 'string', nullable: true },
                    },
                },
                Investor: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', format: 'uuid' },
                        name: { type: 'string' },
                        investor_type: { type: 'string' },
                        email: { type: 'string', format: 'email' },
                        created_at: { type: 'string', format: 'date-time' },
                    },
                },
                Fund: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', format: 'uuid' },
                        name: { type: 'string' },
                        vintage_year: { type: 'integer' },
                        target_size_usd: {
                            oneOf: [
                                { type: 'number' },
                                { type: 'string', description: 'Decimal serialized as string' },
                            ],
                        },
                        status: { type: 'string' },
                    },
                },
                Investment: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', format: 'uuid' },
                        investor_id: { type: 'string', format: 'uuid' },
                        fund_id: { type: 'string', format: 'uuid' },
                        amount_usd: {
                            oneOf: [
                                { type: 'number' },
                                { type: 'string', description: 'Decimal serialized as string' },
                            ],
                        },
                        investment_date: { type: 'string', format: 'date-time' },
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
                        target_size_usd: {
                            oneOf: [
                                { type: 'number' },
                                { type: 'string', description: 'Decimal serialized as string' },
                            ],
                        },
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
                        investor_id: { type: 'string', format: 'uuid' },
                        amount_usd: {
                            oneOf: [
                                { type: 'number' },
                                { type: 'string', description: 'Decimal serialized as string' },
                            ],
                        },
                        investment_date: { type: 'string', format: 'date-time' },
                    },
                },
                TransactionInput: {
                    type: 'object',
                    required: ['fund_id', 'amount', 'fee_percentage'],
                    properties: {
                        fund_id: { type: 'string', format: 'uuid' },
                        amount: {
                            oneOf: [
                                { type: 'number' },
                                { type: 'string', description: 'Decimal serialized as string' },
                            ],
                        },
                        fee_percentage: {
                            oneOf: [
                                { type: 'number' },
                                { type: 'string', description: 'Decimal serialized as string' },
                            ],
                        },
                        auto_calculate_fees: { type: 'boolean' },
                        bypass_validation: { type: 'boolean' },
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
                        fund_id: { type: 'string', format: 'uuid' },
                        new_fee_percentage: {
                            oneOf: [
                                { type: 'number' },
                                { type: 'string', description: 'Decimal serialized as string' },
                            ],
                        },
                        apply_retroactively: { type: 'boolean' },
                    },
                },
                TotalValueResponse: {
                    type: 'object',
                    properties: {
                        total_value: {
                            oneOf: [
                                { type: 'number' },
                                { type: 'string', description: 'Decimal serialized as string' },
                            ],
                        },
                        pending_value: {
                            oneOf: [
                                { type: 'number' },
                                { type: 'string', description: 'Decimal serialized as string' },
                            ],
                        },
                        transaction_count: { type: 'integer' },
                    },
                },
            },
        },
    },
    apis: ['./src/routes/*.ts'],
});
