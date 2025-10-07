import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

export const errorHandler = (
    err: Error,
    _req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (err instanceof ZodError) {
        return res
            .status(400)
            .json({ error: 'Validation failed', details: err.issues });
    }
    res.status(500).json({
        error: 'Internal server error',
        message:
            process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
};
