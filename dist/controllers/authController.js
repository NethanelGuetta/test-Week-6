"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const teacherModel_1 = __importDefault(require("../models/teacherModel"));
const token_1 = require("../utils/token");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    const teacher = yield teacherModel_1.default.findOne({ email: email });
    if (teacher) {
        if (!(yield teacher.comparePassword(password))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const token = (0, token_1.generateToken)(teacher.id, "teacher");
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            maxAge: 3600000
        });
        return res.status(200).json({ message: "logged in successfully", token });
    }
    // const student = await Student.findOne({ email: email });
    // if (student) {
    //     if (!(await student.comparePassword(password))) {
    //         return res.status(401).json({ message: "Invalid email or password" });
    //     }
    //     const token = generateToken(student.id, "student");
    //     res.cookie('token', token, {
    //         httpOnly: true,
    //         secure: false,
    //         maxAge: 3600000
    //     })
    //     return res.status(200).json({ message: "logged in successfully", token });
    // }
});
exports.login = login;
