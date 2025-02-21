import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validateRequest = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const formattedErrors = errors.array().map(err => ({
            msg: err.msg,
            param: err.param
        }));
        res.status(400).json({ errors: formattedErrors });
        return;
    }
    next();
};