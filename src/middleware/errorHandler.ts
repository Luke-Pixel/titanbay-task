import { Request, Response } from 'express';
import { ZodError } from 'zod';

export const errorHandler = (err: Error, _req: Request, res: Response) => {
    if (err instanceof ZodError) {
        return res.status(400).json({ validationErrors: err.issues });
    }
    console.error('Unhandled error:', err);
    res.status(500).json({ message: 'Internal server error' });
};
