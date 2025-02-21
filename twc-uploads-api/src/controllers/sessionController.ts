import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Session from "../models/UserLoginSession";
import User from "../models/UserRegisterModel";

export const createSession = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId }: { userId: number } = req.body;

        const user = await User.findByPk(userId);

        if (!user) {
            res.status(404).json({ error: "User not found" });
        }

        const token = jwt.sign({ id: user?.id }, process.env.JWT_SECRET as string, { expiresIn: "1d" });

        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
        const createdAt = new Date();

        await Session.create({ userId, token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzQwMTI5NTM1LCJleHAiOjE3NDAyMTU5MzV9.j8hArs35XM5AqASibuw66dgOVFbR6mz37u6_HgkJS28" });

        res.status(201).json({ message: "Session created" });

    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.body;
        await Session.destroy({ where: { userId } });
        res.json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
