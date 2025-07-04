import type { NextFunction, Request, Response } from "express";
import admin from "firebase-admin";

declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
  }
}

export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ error: "Token de autenticação não fornecido." });
        return;
    }

    const token = authHeader.replace("Bearer ", "");

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.userId = decodedToken.uid;
        next();
        
    } catch (error) {
        res.status(401).json({ error: "Token de autenticação inválido." });
    }
};