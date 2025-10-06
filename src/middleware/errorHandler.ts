import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

export const errorHandler = (
    err: Error,
    _req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (err instanceof ZodError) {
        return res.status(400).json({ validationErrors: err.issues });
    }
    res.status(500).json({ message: 'Internal server error' });
};
