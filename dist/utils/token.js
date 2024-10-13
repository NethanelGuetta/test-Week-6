"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIdFromToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Generate a JWT token
const generateToken = (userId, role) => {
    return jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};
exports.generateToken = generateToken;
//Returns the user id from the token
const getIdFromToken = (token) => {
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    return decoded.userId;
};
exports.getIdFromToken = getIdFromToken;
