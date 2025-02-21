import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Session from "../models/UserLoginSession";

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ error: "Access denied, no token provided" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number };
        const session = await Session.findOne({ where: { userId: decoded.id, token } });

        if (!session || new Date() > new Date(session.expiresAt)) {
            return res.status(401).json({ error: "Session expired, please login again" });
        }

        req.body.userId = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
};