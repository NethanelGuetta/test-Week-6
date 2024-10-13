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
exports.registerTeacher = void 0;
const teacherModel_1 = __importDefault(require("../models/teacherModel"));
const teacerService_1 = require("../services/teacerService");
const classService_1 = require("../services/classService");
const registerTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, password, email, KlassName } = req.body;
    try {
        const teacherExist = yield teacherModel_1.default.findOne({ email: email });
        if (teacherExist) {
            return res.status(401).json({ message: "Teacher already exist" });
        }
        const newTeacher = yield (0, teacerService_1.createTeacher)({
            name, password, email
        });
        const newKlass = yield (0, classService_1.createKlass)({
            name: KlassName,
            teacherId: newTeacher._id,
            students: []
        });
        yield (0, teacerService_1.updateTeacher)(newTeacher._id, newKlass._id);
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(400).json("Error registering user");
    }
});
exports.registerTeacher = registerTeacher;
