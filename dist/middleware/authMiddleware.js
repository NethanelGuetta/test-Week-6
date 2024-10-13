"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
;
// Authenticate the user
const authMiddleware = (req, res, next) => {
    //Try to get the token from the cookies 
    const token = req.cookies.token;
    //If there is no token, return an error
    if (!token) {
        res.status(401).json({ message: 'אין לך תוקן  ' });
        return;
    }
    try {
        //If there is a token, verify it
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        //Add the user information to the request
        req.user = decoded;
        //Continue to the next function
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'הטוקן לא בתוקף' });
    }
};
exports.authMiddleware = authMiddleware;
