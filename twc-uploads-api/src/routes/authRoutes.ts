import express, { Request, Response } from "express";
import { body } from 'express-validator';
import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";
import moment from "moment";

import { UserRegisterModel } from "../models/UserRegisterModel";
import { generateSession } from "../helpers/session";
import { generateToken } from "../helpers/jwt";
import { validateRequest } from "../middlewares/validateRequest";

const router = express.Router();

router.post("/api/auth/login",
    [
        body('email')
            .isEmail()
            .withMessage('Email must be valid'),
        body('password')
            .trim()
            .notEmpty()
            .withMessage('Password cannot be empty'),
        body('source')
            .optional()
            .isIn(['web'])
            .withMessage('Valid source must be provided')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password, source } = req.body;

        const user = await UserRegisterModel.findOne({
            where: {
                email: email,
            },
            attributes: ['id', 'name', 'email', 'password', 'isActive']
        });

        if (!user) {
            res.status(401).json({ error: "User Not Found" });
            return;
        }

        const { id, name, email: userEmail, password: hashedPassword, isActive } = user.dataValues;

        const isMatch = await bcrypt.compare(password, hashedPassword);

        if (!isMatch) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }

        const sessionId = await generateSession({
            userId: id,
            ip: req.ip,
            sessionStartTime: moment().toISOString(),
            source,
            loginMethod: 'email'
        });

        const token = generateToken(id, sessionId);

        if (source === 'web') {
            req.session = { token };
        }

        res.status(200).json({ token });
    }
);

router.post("/api/auth/register",
    [
        body('name')
            .trim()
            .notEmpty()
            .withMessage('Name cannot be empty'),
        body('email')
            .isEmail()
            .withMessage('Email must be valid'),
        body('password')
            .trim()
            .notEmpty()
            .withMessage('Password cannot be empty'),
        body('source')
            .optional()
            .isIn(['web'])
            .withMessage('Valid source must be provided'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { name, email, password } = req.body

        const existingUser = await UserRegisterModel.findOne({
            where: {
                email: email,
            }
        })

        if (existingUser) {
            res.status(400).json({ error: "User already exists" });
            return
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await UserRegisterModel.create({
            id: uuid(),
            name,
            email,
            password: hashedPassword
        })

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            member: user
        })
        return
    }
);

export default router;