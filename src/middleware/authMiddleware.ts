//Generic function to authenticate user's token
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
    user?: { userId: string, role?: string }
};

// Authenticate the user
export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
    //Try to get the token from the cookies 
    const token = req.cookies.token;
    //If there is no token, return an error
    if (!token) {
        res.status(401).json({ message: 'אין לך תוקן  ' });
        return;
    }
    try {
        //If there is a token, verify it
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string, role: string }
        //Add the user information to the request
        req.user = decoded;
        //Continue to the next function
        next();
    } catch (error) {
        res.status(401).json({ message: 'הטוקן לא בתוקף' });
    }
}
